const db = require('../db');

const Booking = {
  getAllBookings: (callback) => {
    const query = 'SELECT * FROM booking_reservation';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = Booking;