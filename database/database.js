// ./database/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database (or create one if it doesn't exist)
const db = new sqlite3.Database(path.resolve(__dirname, 'products.db'), (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )
`);

// create user table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

module.exports = db;
