const express = require('express'); // Similar to import express module
const app = express();
const path = require('path'); // Module to handle file and directory paths
const PORT = 3000;
const methodOverride = require('method-override'); // Import method-override middleware
const session = require('express-session'); // Import express-session for session management

app.set('view engine', 'ejs'); // mandatory line for using view engine
app.set('views', path.join(__dirname, './views')); // set views directory

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.json()); // Middleware to parse JSON requests
app.use(methodOverride('_method')); // Use method-override to support DELETE and PUT methods

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
})); 

/* Routing with HTTP methods such as GET, POST, PUT, DELETE
  app.get('/', (res, req) => {  // GET at root './' using Request/Response functions
  res
  .status(200) // Status codes : 1xx Information, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error
  .send('all clear')
  .render('index', { text : 'paragraph'})
}) */
// Routes : create route for /product /users /carts /orders

// require() => app.use('/', );
const productRouter = require('./routes/products');
const db = require('./database/database');
app.use('/products', productRouter);

const userRouter = require('./routes/user');
app.use('/users', userRouter); // Use userRouter for /users route

const SessionAuth = require('./middleware/SessionAuth');

app.get('/', SessionAuth, (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.render('index', { product: rows });
    });
});   

app.get('/login', (req, res) => {
  res.render('login');
  //req.session.user = null; // Clear session user on login page
})

app.get('/signup', (req, res) => {
  res.render('signup')
})

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect('/login');
  });
});


app.use(express.static(path.join(__dirname, 'public'))) // http://localhost:3000
// server
app.listen(PORT, () => {
  console.log('\nServer is running on http://localhost:' + PORT);
});
