// models/groups.js

const { group } = require('console');
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

const checkGroupMembership = (userId, groupId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT 1 FROM group_members WHERE userId = ? AND groupId = ?`;
        db.get(sql, [userId, groupId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(!!row); // Convert row existence to boolean
            }
        });
    });
};

const findGroupByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM group_members WHERE userId = ?`;
        db.get(sql, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result); // Assume it returns the group ID if found
            }
        });
    });
};

const fetchGroupStatusUpdates = (groupId) => {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT status_updates.* FROM status_updates
            JOIN group_members ON status_updates.userId = group_members.userId
            WHERE group_members.groupId = ?
            ORDER BY status_updates.timestamp DESC`;
        db.all(sql, [groupId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = {
    createGroup,
    getGroupByInvitationCode,
    addMemberToGroup,
    checkGroupMembership,
    findGroupByUserId,
    fetchGroupStatusUpdates
};