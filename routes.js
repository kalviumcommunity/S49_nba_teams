const express = require('express');
const router = express.Router();

// Import your route handlers for CRUD operations from the docs.bruno folder
const {
  createItem,
  readItem,
  updateItem,
  deleteItem
} = require('./docs.bruno');

// Define CRUD routes
router.post('/items', createItem); // Create a new item
router.get('/items/:id', readItem); // Read a specific item
router.put('/items/:id', updateItem); // Update a specific item
router.delete('/items/:id', deleteItem); // Delete a specific item

module.exports = router;
