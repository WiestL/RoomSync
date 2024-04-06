// models/groceryItem.js
const db = require('../database.js');

// Add a new grocery item to a group
const addGroceryItem = (groupId, itemName, quantity) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO grocery_items (groupId, itemName, quantity) VALUES (?, ?, ?)`;
        db.run(sql, [groupId, itemName, quantity], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID); // Returns the ID of the newly added grocery item
            }
        });
    });
};

// Get all grocery items for a specific group
const getGroceryItemsByGroupId = (groupId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM grocery_items WHERE groupId = ? ORDER BY createdAt DESC`;
        db.all(sql, [groupId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows); // Returns all grocery items for the group
            }
        });
    });
};

// Update a specific grocery item's details
const updateGroceryItem = (itemId, updates) => {
    const { itemName, quantity, completed } = updates;
    return new Promise((resolve, reject) => {
        const sql = `UPDATE grocery_items SET itemName = ?, quantity = ?, completed = ? WHERE id = ?`;
        db.run(sql, [itemName, quantity, completed, itemId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes); // Check if any rows were actually updated
            }
        });
    });
};

// Delete a grocery item by its id
const deleteGroceryItem = (itemId) => {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM grocery_items WHERE id = ?`;
        db.run(sql, [itemId], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.changes); // Returns the number of rows deleted
            }
        });
    });
};

// Getting the grocery items from a group
const getGroceryItemGroupId = (itemId) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT groupId FROM grocery_items WHERE id = ?`;
        db.get(sql, [itemId], (err, row) => {
            if (err) {
                reject(err);
                console.error("Database error:", err);
            } else if (row) {
                resolve(row.groupId);
            } else {
                console.log("No group found for itemId:", itemId);
                resolve(null);
            }
        });
    });
};



module.exports = { addGroceryItem, getGroceryItemsByGroupId, updateGroceryItem, deleteGroceryItem, getGroceryItemGroupId };