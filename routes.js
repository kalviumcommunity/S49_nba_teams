const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = async (req, res, next) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
    }
    req.dbClient = client;
    next();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
};

const closeDB = async (req, res, next) => {
  try {
    if (client.isConnected()) {
      await client.close();
    }
    next();
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
};

router.post('/create', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    res.status(201).json({ "success": "data created" });
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

router.get('/read', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    res.status(200).json({ "success": "data read" });
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

router.put('/update', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    res.status(200).json({ "success": "data updated" });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

router.delete('/delete', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    res.status(200).json({ "success": "data deleted" });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

module.exports = router;
