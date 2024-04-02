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

module.exports = { createUser };
