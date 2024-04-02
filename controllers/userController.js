// controllers/userController.js
const { createUser } = require('../models/user');

// Assuming hashPassword function is defined above or imported

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const passwordHash = await hashPassword(password); // Hash the password
        const userId = await createUser(name, email, passwordHash);
        res.status(201).send({ userId, message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ error: "Failed to register user" });
    }
};

module.exports = { registerUser };

const bcrypt = require('bcrypt');

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
