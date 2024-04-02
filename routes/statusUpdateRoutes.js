// routes/statusUpdateRoutes.js
const express = require('express');
const { postStatusUpdate } = require('../controllers/statusUpdateController');
const router = express.Router();

// Route for posting a status update
router.post('/', postStatusUpdate);

module.exports = router;
