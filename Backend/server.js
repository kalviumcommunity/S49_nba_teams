require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
let StatData=require("./models/teams.js")

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


Connection().then(()=>{

  app.listen(port, () => {
    console.log(`🚀 server running on PORT: ${port}`);
  });
})


