const db = require('../database/database'); // Add this line to import db

const userController = {
  getAllusers: (req, res) => {
    const query = 'SELECT * FROM users';
    db.all(query, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(rows); // Send all users
      }
    });
  },
  
  createUser: (req, res) => {
    const { username, password } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, password], function (err) {
      if (err) {
        res.status(500).json({ error : err.message})
      } else {
        //res.redirect('/login'); // Redirect to login page after signup
        res.status(201).json({ message: 'User created successfully', userId: this.lastID });
      }
    })
    // TODO: to continue/check
  },

  getUser: (req, res) => {
    const { username, password } = req.query; // Use req.query for GET form
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.get(query, [username, password], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (row) {
        req.session.user = row; // Store user in session
        res.redirect('/'); // Redirect to home page if user is found
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    });
  }
}


module.exports = userController;