require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const StatData = require("./models/teams.js");
const UTdata = require("./models/usert.js");
const { validateTeam } = require('./models/validator.js'); 
const cookieParser = require("cookie-parser");
const User = require('./models/users.js')
const jwt = require('jsonwebtoken')


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function Connection() {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to DB");
}

app.get('/teams', async (req, res) => {
    try {
        const teams = await StatData.find();
        console.log('Retrieved teams:', teams);
        res.json(teams);
    } catch (err) {
        console.error('Error retrieving teams:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getteam/:id', (req, res) => {
    const id = req.params.id;
    UTdata.findById({ _id: id })
        .then(usert => res.json(usert))
        .catch(err => res.json(err));
});

app.get('/createteam', (req, res) => {
    UTdata.find({})
        .then(usert => res.json(usert))
        .catch(err => res.json(err));
});

app.post("/createteam", async (req, res) => {
    try {
        const { error, value } = validateTeam(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const team = await UTdata.create(value);
        res.json(team);
    } catch (err) {
        console.error('Error creating team:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/updateteam/:id', (req, res) => {
    const id = req.params.id;
    UTdata.findByIdAndUpdate({ _id: id }, {
        Team_Name: req.body.Team_Name, Rep_City: req.body.Rep_City, Conference: req.body.Conference
    })
        .then(usert => res.json(usert))
        .catch(err => res.json(err));
});

app.delete('/deleteteam/:id', (req, res) => {
    const id = req.params.id;
    UTdata.findByIdAndDelete({ _id: id })
        .then(deletedTeam => res.json(deletedTeam))
        .catch(err => res.json(err));
});


app.post("/register", async (req, res) => {
    try {
        const { firstName, password } = req.body;
        const existingUser = await User.findOne({ firstName });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const newUser = await User.create({ firstName, password });

        const token = jwt.sign({ firstName: newUser.firstName }, process.env.ACCESS_TOKEN_SECRET);

        res.cookie("token", token, { httpOnly: true });

        res.status(201).json(newUser);
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post('/logout', (req, res) => {
    res.clearCookie('username');
    res.status(200).json({ message: 'Logout successful' });
  });

  app.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'firstName');
        res.json(users);
    } catch (err) {
        console.error('Error retrieving users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


Connection().then(() => {
    app.listen(port, () => {
        console.log(`🚀 server running on PORT: ${port}`);
    });
});