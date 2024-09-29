const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const isAdmin = require('../middleware/isAdmin');
const categoryController = require('../Controllers/categoryController.js');

// Add a new category
router.post('/new', categoryController.addCategory);

// // Get all categories
 router.get('/', categoryController.getAllCategories);


// // Delete a categoty by ID
 router.delete('/:category_id', categoryController.deleteCategory);

module.exports = router;
