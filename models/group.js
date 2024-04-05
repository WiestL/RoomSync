// models/groups.js

const db = require('../database.js');
const crypto = require('crypto');

//Function to create a new group and return its ID
const createGroup = (groupName) => {
    return new Promise((resolve, reject) => {
        const invitationCode = crypto.randomBytes(8).toString('hex'); // Generates a simple, unique invitation code
        const sql = `INSERT INTO groups (groupName, invitationCode) VALUES (?, ?)`;

        db.run(sql, [groupName, invitationCode], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, invitationCode }); // Return both ID and invitation code of the new group
            }
        });
    });
};

// Retrieve a group by its invitation code
const getGroupByInvitationCode = (invitationCode) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id FROM groups WHERE invitationCode = ?`;
        db.get(sql, [invitationCode], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

// Function to add a user to a group
const addMemberToGroup = (userId, groupId) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO group_members (userId, groupId) VALUES (?, ?)`;
        db.run(sql, [userId, groupId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID); // Returns the ID of the new group_member entry
            }
        });
    });
};

module.exports = {
    createGroup,
    getGroupByInvitationCode,
    addMemberToGroup
};