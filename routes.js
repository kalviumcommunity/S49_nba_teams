const express = require('express');
const router = express.Router();
const {
  createItem,
  readItem,
  updateItem,
  deleteItem
} = require('./docs.bruno');

// Define CRUD routes
router.post('/items', createItem); 
router.get('/items/:id', readItem); 
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

module.exports = router;
