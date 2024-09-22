const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');


router.get('/bookings',bookingController.getAllBookings);

// Route to handle booking a parking space
router.post('/bookings', (req, res) => {
    const { UserID, Location_ID, Car_Number, Car_Type, date, start_time, end_time } = req.body;
  
    // Call the booking controller function
    bookingController.bookParking(UserID, Location_ID, Car_Number, Car_Type, date, start_time, end_time, (err, result) => {
      if (err) return res.status(500).send('Error booking parking space');
  
      res.json(result);
    });
  });


module.exports = router;
