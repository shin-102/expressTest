const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// GET /users/        -> Get all users as JSON
router.get('/', userController.getAllusers);
// POST /users/signup -> Create a new user
router.post('/signup', userController.createUser);
// GET /users/login   -> Get a user (login)
router.get('/login', userController.getUser);

module.exports = router;