const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// Route to handle booking a parking space
// router.post('/api/book-parking', bookingController.bookParkingSpace);

// Route to get available parking spaces
// router.get('/available-spaces', bookingController.getAvailableSpaces);


router.get('/bookings', bookingController.getAllBookings);

// Route to handle booking a parking space
router.post('/book', (req, res) => {
  const { Location_ID, Vehicle_Number, Vehicle_Type, Start_time, End_time } = req.body;
  const User = req.session.user; // Retrieve UserID from session

  if (!User) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  const UserID = User.id;
  // Call the booking controller function
  // console.log(UserID, Location_ID, Vehicle_Number, Vehicle_Type, Start_time, End_time);

  bookingController.bookParking(UserID, Location_ID, Vehicle_Number, Vehicle_Type, Start_time, End_time)
    .then(() => {
      return res.status(200).send('<html><body><h1>Booking successful</h1><a href="/">Go to dashboard<a></body></html>');
    })
    .catch(err => {
      if (err) {
        console.error('Error booking parking space:', err);
        return res.status(500).json({ error: 'Error booking parking space', details: err.message });
      }
    });

});

// Route to render the booking page with available spaces and time slots
// router.get('/booking', (req, res) => {
//   bookingController.getAllAvailableSpacesAndTimeSlots((err, availableSpaces) => {
//     if (err) {
//       console.error('Error fetching available spaces:', err);
//       return res.status(500).send('Error fetching available spaces');
//     }
//     res.render('booking', { availableSpaces });
//   });
// });

// Route to handle booking a parking space
// router.post('/api/book-parking', bookingController.bookParkingSpace);


module.exports = router;
