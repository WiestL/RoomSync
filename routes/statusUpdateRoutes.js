// routes/statusUpdateRoutes.js
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const { postStatusUpdate } = require('../controllers/statusUpdateController');
const router = express.Router();

// Route for posting a status update
router.post('/', authMiddleware, postStatusUpdate);

module.exports = router;
