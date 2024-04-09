const express = require('express');
const router = express.Router({ mergeParams: true }); // Ensures :groupId can be passed in
const authMiddleware = require('../middleware/authMiddleware');
const groceryController = require('../controllers/groceryController'); // Check path correctness

// Endpoint to add a new grocery item
router.post('/', authMiddleware, groceryController.addGroceryItemToGroup);

// Endpoint to get all grocery items for a group
router.get('/', authMiddleware, groceryController.getGroceryItems);

// Endpoint to update a grocery item
router.put('/:itemId', authMiddleware, groceryController.updateGroceryItemDetails);

// Endpoint to delete a grocery item
router.delete('/:itemId', authMiddleware, groceryController.deleteGroceryItemById);

module.exports = router;
