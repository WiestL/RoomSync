// routes/statusUpdateRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { 
    postStatusUpdate,
    getAllStatusUpdates,
    getStatusUpdate,
    updateStatusUpdate,
    deleteStatusUpdate 
} = require('../controllers/statusUpdateController');
const router = express.Router();

// Route for posting a status update
router.post('/', authMiddleware, postStatusUpdate);

// Route for getting all status updates
router.get('/', authMiddleware, getAllStatusUpdates);

// Route for getting a specific status update by ID
router.get('/:id', authMiddleware, getStatusUpdate);

// Route for updating a specific status update by ID
router.put('/:id', authMiddleware, updateStatusUpdate);

// Route for deleting a specific status update by ID
router.delete('/:id', authMiddleware, deleteStatusUpdate);

module.exports = router;
