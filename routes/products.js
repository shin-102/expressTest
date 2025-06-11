const express = require('express');
const router = express.Router();

/*
router
  .get('/', (req, res) => {
    res.send('All products');
  })
  .get('/:id', (req, res) => {
    res.send('Product with id: ' + req.params.id);
  })
*/
// The above code is a simple router that sends a response to the client when the sending a GET request to the /products route

// Since Routes should be responsible for routing requests, not for handling the complex logic of those requests, we write it like including Controllers
const productsController = require('../controllers/productsController');

router
  .get('/', productsController.getAllProducts)        // GET `/products`
  .get('/:id', productsController.getProductById)     // GET `/products/:id`
  .post('/', productsController.createProduct)        // POST `/products`
  .put('/:id', productsController.updateProduct)      // PUT `/products/:id`
  .delete('/:id', productsController.deleteProduct);  // DELETE `/products/:id`

module.exports = router;
