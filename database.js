const sqlite3 = require('sqlite3').verbose();

// Create a new database file. If it doesn't exist, SQLite will automatically create it.
let db = new sqlite3.Database('./roomsync.db', (err) => {
  if (err) {
    console.error('Error opening database ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Close the database connection when the application is terminated
process.on('exit', () => {
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Closed the database connection.');
  });
});

module.exports = db;

db.serialize(() => {
    // Create the Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      passwordHash TEXT NOT NULL
    );`);
  
    // Create the StatusUpdates table
    db.run(`CREATE TABLE IF NOT EXISTS status_updates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER NOT NULL,
      statusText TEXT NOT NULL,
      wantVisitors BOOLEAN NOT NULL DEFAULT 0,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id)
    );`);

    // Create the Groups table including the invitationCode
    db.run(`CREATE TABLE IF NOT EXISTS groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupName TEXT NOT NULL,
      invitationCode TEXT NOT NULL UNIQUE,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`);

    // Create the GroupMembers table
    db.run(`CREATE TABLE IF NOT EXISTS group_members (
      userId INTEGER NOT NULL,
      groupId INTEGER NOT NULL,
      joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (userId, groupId),
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE 
    );`);

    // Create the GroceryItems table
    db.run(`CREATE TABLE IF NOT EXISTS grocery_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      groupId INTEGER NOT NULL,
      itemName TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completed BOOLEAN NOT NULL DEFAULT 0,
      FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE
  );`);
  
  });
  