const express = require('express');
const router = express.Router();
const billController = require('../controllers/billController');

router.get('/bills', billController.getAllBills);

// Route to calculate the bill for a user
router.post('/calculate', (req, res) => {
    const { UserID } = req.body;
  
    // Call the bill calculation function
    billController.calculateBill(UserID, (err, result) => {
      if (err) return res.status(500).send('Error calculating bill');
      
      res.json(result);
    });
  });
  

module.exports = router;