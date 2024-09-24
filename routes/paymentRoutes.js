const express = require('express');
const router = express.Router();
const path = require('path');
const { processPayment, printReceipt, processPostPayment } = require('../controllers/paymentController');
const Payment = require('../models/paymentModel'); // Ensure the correct path to your paymentModel.js file
const db = require('../db');

// Route for processing payment by UserID (POST)
router.post('/process-payment', processPayment);

// Route for printing a receipt using Bill_id (GET)
router.get('/print-receipt/:Bill_id', printReceipt);

// Route for handling payment and deleting booking (POST)
router.post('/post-payment', processPostPayment);

// Route for fetching all due payments for the authenticated user (GET)
router.get('/due', async (req, res) => {
    const userId = req.session.user && req.session.user.id;

    if (!userId) {
        return res.status(401).json({ status: 'error', message: 'User not authenticated' });
    }

    try {
        const payments = await Payment.findAll({ where: { User_id: userId } });

        if (!payments || payments.length === 0) {
            return res.status(404).json({ status: 'error', message: 'No due payments found' });
        }

        res.json({ status: 'success', payments });
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ status: 'error', message: 'Error fetching payments' });
    }
});

// Route for serving the payment page
router.get('/', async (req, res) => {
    try {
        // Assuming you have a way to get the logged-in user's ID, e.g., from the session
        const userId = req.session.user.id; // Replace with actual method to get user ID

        if (!userId) {
            return res.status(401).send('User not logged in');
        }

        // Fetch the user's fees from the database using Sequelize
        // [results, metadata]
        const [results] = await db.query('SELECT fees FROM users WHERE id = :id', {
            replacements: {
                id: userId
            },
            type: db.QueryTypes.SELECT
        });
        // console.log(results);

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const dueAmount = results.fees;
        // console.log(results, dueAmount);

        // Render payment.ejs with dueAmount
        res.render('payment', { dueAmount: dueAmount });
    } catch (err) {
        console.error('Error fetching due amount:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post("/pay", async (req, res) => {
    try {
        const userId = req.session.user.id;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'User not authenticated' });
        }


        // remove all fees from the user's account
        await db.query('UPDATE users SET fees = 0 WHERE id = :id', {
            replacements: {
                id: userId
            }
        });

        res.json({ status: 'success' });
    } catch (error) {
        console.error('Error paying:', error);
        res.status(500).json({ status: 'error', message: 'Error paying' });
    }
});
module.exports = router;

module.exports = router;
