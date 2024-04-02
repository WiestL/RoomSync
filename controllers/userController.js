// controllers/userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config(); 
const { createUser, findUserByEmail } = require('../models/user');

const loginUser = async (req, res) => {
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
// Assuming hashPassword function is defined above or imported

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const passwordHash = await hashPassword(password);
        const userId = await createUser(name, email, passwordHash);
        res.status(201).send({ userId, message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to register user" });
    }
};

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

module.exports = { registerUser, loginUser };
