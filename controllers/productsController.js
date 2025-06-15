// These Controllers is responsible for handling the logic, such as data retrieval, validation, and processing for products.

const db = require('../database/database') // Import SQLite database

const productsController = {
  // GET all products
  getAllProducts: (req ,res) => {
    const query = 'SELECT * FROM products'; // SQL query to select all products
    db.all(query, [], (err, rows) => { // 'db.all' executes query, [] for no parameters, (err, rows) is callback
      if (err) {
        res.status(500).json({ error: err.message});
      } else {
        res.json(rows); // send rows as JSON response
        console.log('products found:', rows.length)
      }
    })
    console.log('Request Type:', req.method) //* log request method
  },

  // GET product by ID
  getProductById: (req, res) => {
    const ProductId = parseInt(req.params.id); // Parse the ID from URL
    const query = 'SELECT * FROM products WHERE id = ?';
    db.get(query, [ProductId], (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (row) {
        res.json(row); // Send the product
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    });
    console.log('Request Type:', req.method, req.params.id) //* log request method
  },

  // POST create a new product
  createProduct: (req, res) => {
    const { name, price } = req.body;
    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    db.run(query, [name, price], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        // res.status(201).json({ id: this.lastID, name, price });
        res.redirect('/'); // Redirect to homepage after method
      }
    });
    console.log('Request Type:', req.method) //* log request method
  },

  // PUT update a product
  updateProduct: (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;
    const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    db.run(query, [name, price, id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        //res.json({ message: 'Product updated successfully' });
        res.redirect('/'); // Redirect to homepage after method
      }
    });
    console.log('Request Type:', req.method) //* log request method
  },

  // DELETE a product
  deleteProduct: (req, res) => {
    const id = parseInt(req.params.id);
    const query = 'DELETE FROM products WHERE id = ?';
    db.run(query, [id], function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ message: 'Product not found' });
      } else {
        // res.json({ message: 'Product deleted successfully' });
        res.redirect('/'); // Redirect to homepage after method
      }
    });
    console.log('Request Type:', req.method) //* log request method
  },
  
};

module.exports = productsController;