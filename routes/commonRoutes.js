const express = require('express');
const router = express.Router();
const commonController = require('../controllers/commonController');

router.get('/comos', commonController.getAllComs);

module.exports = router;