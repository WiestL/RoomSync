// controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config(); 
const { createUser, findUserByEmail, findUserById, updateUserById, deleteUserById } = require('../models/user');

//Logs in user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).send({ error: "Login failed! Check authentication credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordMatch) {
            return res.status(401).send({ error: "Login failed! Check authentication credentials" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(200).send({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: "An internal error occurred. Please try again." });
    }
};

//Registers new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const passwordHash = await hashPassword(password);
        const userId = await createUser(name, email, passwordHash);
        res.status(201).send({ userId, message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to register user" });
    }
};

//Encrypts Password
const hashPassword = async (password) => {
    const saltRounds = 10; // Recommended value for salt rounds
    try {
        // Generate a salt and hash on separate function calls
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error; // Rethrow or handle error as needed
    }
};

// Get a user's profile by their ID
exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assumed to be set from the JWT token after authMiddleware
        const user = await findUserById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        // Exclude sensitive information like password hashes
        delete user.passwordHash;
        res.send(user);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve user profile' });
    }
};

// Update a user's profile
exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assumed to be set from the JWT token after authMiddleware
        const updates = req.body; // Assuming body contains what you want to update
        const result = await updateUserById(userId, updates);
        if (result) {
            res.send({ message: 'User profile updated successfully' });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to update user profile' });
    }
};

// Delete a user's account
exports.deleteUserAccount = async (req, res) => {
    try {
        const userId = req.user.id; // Assumed to be set from the JWT token after authMiddleware
        const result = await deleteUserById(userId);
        if (result) {
            res.send({ message: 'User account deleted successfully' });
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete user account' });
    }
};

//module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserAccount };
