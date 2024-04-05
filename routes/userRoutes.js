// routes/userRoutes.js
const express = require('express');
const { 
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount
} = require('../controllers/userController');
const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route to login the user
router.post('/login', loginUser);

// Route to get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Route to update user profile
router.put('/profile', authMiddleware, updateUserProfile);

// Route to delete user account
router.delete('/account', authMiddleware, deleteUserAccount);


module.exports = router;
