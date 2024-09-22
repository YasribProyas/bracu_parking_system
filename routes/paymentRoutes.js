const express = require('express');
const router = express.Router();
const { processPayment, printReceipt, processPostPayment } = require('../controllers/paymentController');
const paymentController = require('../controllers/paymentController');

// Route for processing payment by UserID (POST)
router.post('/process-payment', processPayment);

// Route for printing a receipt using Bill_id (GET)
router.get('/print-receipt/:Bill_id', printReceipt);

// Route for handling payment and deleting booking (POST)
router.post('/post-payment', processPostPayment);


router.get('/', paymentController.getAllPayments); 

module.exports = router;
