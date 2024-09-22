const express = require('express');
const router = express.Router();
const parkingSpaceController = require('../controllers/parkingSpaceController');

router.get('/', parkingSpaceController.getAllParkingSpace);

module.exports = router;