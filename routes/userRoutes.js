// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');  // Assuming a controller exists

// Example route for fetching users
router.get('/', userController.getAllUsers);

module.exports = router;
