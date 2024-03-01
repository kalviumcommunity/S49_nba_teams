  require('dotenv').config();
  const express = require('express');
  const mongoose = require('mongoose');
  const cors = require('cors');
  let StatData=require("./models/teams.js")
  const UTdata = require("./models/usert.js")

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  async function Connection(){
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connected to DB")
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

  app.get('/getteam/:id',(req,res)=>{
    const id= req.params.id;
    UTdata.findById({_id:id})
    .then(usert => res.json(usert))
    .catch(err => res.json(err))
  })

   app.get('/createteam', (req,res) => {
     UTdata.find({})
     .then(usert => res.json(usert))
     .catch(err => res.json(err))
   })

   app.post("/createteam",(req,res) => {
     UTdata.create(req.body)
     .then(usert => res.json(usert))
     .catch(err => res.json(err))
   })

   app.put('/updateteam/:id', (req,res) => {
    const id = req.params.id
    UTdata.findByIdAndUpdate({_id: id},{
      Team_Name: req.body.Team_Name, Rep_City: req.body.Rep_City, Conference : req.body.Conference})
    .then(usert => res.json(usert))
    .catch(err => res.json(err))
   })

   app.delete('/deleteteam/:id', (req, res) => {
    const id = req.params.id;
    UTdata.findByIdAndDelete({_id:id})
      .then(deletedTeam => res.json(deletedTeam))
      .catch(err => res.json(err));
  });
  


  Connection().then(()=>{

    app.listen(port, () => {
      console.log(`🚀 server running on PORT: ${port}`);
    });
  })


