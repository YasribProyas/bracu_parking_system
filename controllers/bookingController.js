// controllers/bookingController.js
const db = require('../db');
const Booking = require('../models/bookingModel');
const BookingReservation = require('../models/bookingModel');

exports.getAllBookings = (req, res) => {
    Booking.getAllBookings((bookings) => {
        res.render('booking_reservation', {bookings});
    });
};

// Function to check availability
const checkAvailability = (Location_ID, Date, Car_Type, Start_time, End_time, callback) => {
  const query = `
    SELECT * FROM parking_space
    WHERE Location_ID = ? 
      AND Date = ? 
      AND Car_Tupe = ?
      AND Start_time <= ? 
      AND End_time >= ?;
  `;
  db.query(query, [Location_ID, Date, Car_Type, Start_time, End_time], (err, results) => {
    if (err) return callback(err, null);
    callback(null, results);
  });
};

// Function to book a parking space
const bookParking = (User_id, Location_ID, Car_Number, Car_Type, Date, Start_time, End_time, callback) => {
  // First, check if the parking space is available
  checkAvailability(Location_ID, Date, Car_Type, Start_time, End_time, (err, availability) => {
    if (err) return callback(err, null);
    
    if (availability.length > 0) {
      // Parking space is available, proceed to book
      const insertBookingQuery = `
        INSERT INTO booking_reservation (UserID, Location_ID, Car_Number, Car_Type, Date, Start_time, End_time)
        VALUES (?, ?, ?, ?, ?, ?, ?);
      `;
      db.query(insertBookingQuery, [User_id, Location_ID, Car_Number, Car_Type, date, start_time, end_time], (err, result) => {
        if (err) return callback(err, null);

        // After successful booking, delete the parking space
        const deleteParkingQuery = `
          DELETE FROM parking_space
          WHERE Location_ID = ? 
            AND available_date = ? 
            AND start_time = ? 
            AND end_time = ?;
        `;
        db.query(deleteParkingQuery, [Location_ID, Date, Car_Type, Start_time, End_time], (err, result) => {
          if (err) return callback(err, null);
          callback(null, { message: 'Booking successful and parking space removed' });
        });
      });
    } else {
      // Parking space not available
      callback(null, { message: 'Parking space not available' });
    }
  });
};

exports.bookParkingSpace = (req, res) => {
  const { User_id, Location_ID, Car_Number, Car_Type, Date, Start_time, End_time } = req.body;

  // Logic to handle booking (similar to what we have implemented earlier)
  BookingReservation.create({
    User_id, Location_ID, Car_Number, Car_Type, Date, Start_time, End_time
  })
    .then(() => res.redirect('/'))
    .catch(err => res.status(500).send('Error booking parking space'));
};

