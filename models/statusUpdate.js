// models/StatusUpdate.js
const db = require('../database.js');

//Create new status update
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

//Get all status updates
const getStatusUpdates = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM status_updates';
        db.all(sql,[],(err, rows) => {
            if(err) {
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}

//Get a specific status update by ID
const getStatusUpdateById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM status_updates WHERE id = ?';
        db.get(sql,[id],(err, rows) => {
            if(err) {
                reject(err);
            }else{
                resolve(rows);
            }
        });
    });
}

//Update a specific status update by ID
const updateStatusUpdateById = (id, statusText, wantVisitors) => {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE status_updates SET statusText = ?, wantVisitors = ?, wantVisitors = ? WHERE id = ?';
        db.run(sql,[statusText, wantVisitors, id], function(err) {
            if(err) {
                reject(err);
            } else {
                resolve(this.changes);
            }
        });
    });
};

//Delete a specific status update by ID
const deleteStatusUpdateById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM status_updates WHERE id = ?`;
        db.run(sql, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes); // This will resolve to the number of rows deleted
            }
        });
    });
};


module.exports = { 
    createStatusUpdate,
    getStatusUpdates,
    getStatusUpdateById,
    updateStatusUpdateById,
    deleteStatusUpdateById
 };
