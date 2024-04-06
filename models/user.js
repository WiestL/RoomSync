// models/User.js
const db = require('../database.js');

const createUser = (name, email, passwordHash) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO users (name, email, passwordHash) VALUES (?, ?, ?)`;
        db.run(sql, [name, email, passwordHash], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID); // Returns the id of the inserted user
            }
        });
    });
};

const findUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE email = ?`;
        db.get(sql, [email], (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user); // Returns the user object if found, otherwise undefined
            }
        });
    });
};

const findUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM users WHERE id = ?`;
        db.get(sql, [id], (err, user) => {
            if (err) {
                reject(err);
            } else {
                resolve(user); // Returns the user object if found, otherwise undefined
            }
        });
    });
};

const updateUserById = (id, updatedUserData) => {
    return new Promise((resolve, reject) => {
        // Destructure properties from updatedUserData with default values
        const { name = '', email = '', passwordHash = '' } = updatedUserData;
        
        // Define SQL query with placeholders for optional properties
        const sql = `UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), passwordHash = COALESCE(?, passwordHash) WHERE id = ?`;
        
        // Execute SQL query with parameters
        db.run(sql, [name, email, passwordHash, id], function(err) {
            if (err) {
                reject(err);
            } else {
                // Resolve with updated user data
                resolve({ id: this.lastID, ...updatedUserData });
            }
        });
    });
};
module.exports = { createUser, findUserByEmail, findUserById, updateUserById };
