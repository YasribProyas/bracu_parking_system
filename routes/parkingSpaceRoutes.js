const express = require('express');
const router = express.Router();
const parkingSpaceController = require('../controllers/parkingSpaceController');

// router.get('/', parkingSpaceController.getAllParkingSpace);
router.get('/available-spaces', parkingSpaceController.getAvailableSpaces);
module.exports = router;