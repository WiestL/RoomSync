// models/StatusUpdate.js
const db = require('../database.js');

const createStatusUpdate = (userId, statusText, wantVisitors) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO status_updates (userId, statusText, wantVisitors) VALUES (?, ?, ?)`;
        db.run(sql, [userId, statusText, wantVisitors], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    });
};

module.exports = { createStatusUpdate };
