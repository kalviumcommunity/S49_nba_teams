// routes.js
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// MongoDB connection URL
const uri = process.env.DATABASE_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware to handle database connection
const connectDB = async (req, res, next) => {
  try {
    if (!client.isConnected()) {
      await client.connect();
      console.log('Connected to the database');
    }
    req.dbClient = client; // Attach MongoDB client to request object
    next();
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
};

// Middleware to close database connection
const closeDB = async (req, res, next) => {
  try {
    if (client.isConnected()) {
      await client.close();
      console.log('Disconnected from the database');
    }
    next();
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
};

// Create
router.post('/create', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    // Use dbClient to access MongoDB methods (e.g., dbClient.db().collection())
    // Insert data into the database here
    res.status(201).json({ "success": "data created" });
  } catch (error) {
    console.error('Error creating data:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

// Read
router.get('/read', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    // Use dbClient to access MongoDB methods (e.g., dbClient.db().collection())
    // Read data from the database here
    res.status(200).json({ "success": "data read" });
  } catch (error) {
    console.error('Error reading data:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

// Update
router.put('/update', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    // Use dbClient to access MongoDB methods (e.g., dbClient.db().collection())
    // Update data in the database here
    res.status(200).json({ "success": "data updated" });
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

// Delete
router.delete('/delete', connectDB, async (req, res) => {
  try {
    const { dbClient } = req;
    // Use dbClient to access MongoDB methods (e.g., dbClient.db().collection())
    // Delete data from the database here
    res.status(200).json({ "success": "data deleted" });
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).json({ "error": "Internal Server Error" });
  }
});

// Export router
module.exports = router;
