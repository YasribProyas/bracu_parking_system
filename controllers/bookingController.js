const { Sequelize, QueryTypes } = require('sequelize');
const db = require('../db'); // Assuming you have a db configuration file


exports.getAllBookings = async (req, res) => {
  try {
    const bookingsQuery = 'SELECT * FROM booking_reservation';
    const bookings = await db.query(bookingsQuery, {
      type: QueryTypes.SELECT
    });
    // console.log(bookings);

    return res.status(200).json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    throw new Error('Error fetching bookings');
  }
};

exports.getTotalFees = async (req, res) => {
  try {
    const feesQuery = 'SELECT SUM(fees) as total_fees FROM booking_reservation';
    const fees = await db.query(feesQuery, {
      type: QueryTypes.SELECT
    });

    return fees[0].total_fees;
  } catch (err) {
    console.error('Error fetching fees:', err);
    throw new Error('Error fetching fees');
  }
};

// Function to check availability of a parking space
const checkAvailability = async (Location_ID, Start_time, End_time) => {
  const checkQuery = `
    SELECT * FROM time_slots
    WHERE slot_time >= :start_time AND slot_time < :end_time;
  `;
  const results = await db.query(checkQuery, {
    replacements: { start_time: Start_time, end_time: End_time },
    type: QueryTypes.SELECT
  });

  // Check if any slot is available in the given time range
  return results.every(row => row[Location_ID] === 0);
};

// Function to calculate booking fees
const timeStr2TimeNum = (timeStr) => Number(timeStr.split(':')[0]);

const calculateFees = (Start_time, End_time, Vehicle_Type) => {
  const durationInHours = (timeStr2TimeNum(End_time) - timeStr2TimeNum(Start_time));
  console.log(durationInHours);

  const ratePerHour = Vehicle_Type == "Bike" ? 50 : 100; // Example rate per hour
  return durationInHours * ratePerHour;
};

// Function to book a parking space
exports.bookParking = async (User_id, Location_ID, Vehicle_Number, Vehicle_Type, Start_time, End_time) => {
  try {
    // First, check if the parking space is available
    const isAvailable = await checkAvailability(Location_ID, Start_time, End_time);

    if (isAvailable) {
      // Calculate the booking fees
      const fees = calculateFees(Start_time, End_time, Vehicle_Type);

      // Parking space is available, proceed to book
      const insertBookingQuery = `
        INSERT INTO booking_reservation (UserID, Location_ID, Vehicle_Number, Vehicle_Type, Start_time, End_time, fees)
        VALUES (:user_id, :location_id, :vehicle_number, :vehicle_type, :start_time, :end_time, :fees);
      `;
      await db.query(insertBookingQuery, {
        replacements: {
          user_id: User_id,
          location_id: Location_ID,
          vehicle_number: Vehicle_Number,
          vehicle_type: Vehicle_Type,
          start_time: Start_time,
          end_time: End_time,
          fees: fees
        },
        type: QueryTypes.INSERT
      });

      // Update the user's fees
      const updateUserFeesQuery = `
        UPDATE users
        SET fees = fees + :fees
        WHERE id = :user_id;
      `;
      await db.query(updateUserFeesQuery, {
        replacements: { fees: fees, user_id: User_id },
        type: QueryTypes.UPDATE
      });

      // After successful booking, update the time_slots table
      const updateParkingQuery = `
        UPDATE time_slots
        SET ${Location_ID} = 1
        WHERE slot_time >= :start_time AND slot_time < :end_time;
      `;
      await db.query(updateParkingQuery, {
        replacements: { start_time: Start_time, end_time: End_time },
        type: QueryTypes.UPDATE
      });

      return { message: 'Booking successful, parking space updated, and fees added to user account' };
    } else {
      return { message: 'No available parking space' };
    }
  } catch (err) {
    throw new Error('Error booking parking space: ' + err.message);
  }
};

exports.bookParkingSpace = async (req, res) => {
  const { UserID, Location_ID, Vehicle_Number, Vehicle_Type, Start_time, End_time } = req.body;

  try {
    const result = await exports.bookParking(UserID, Location_ID, Vehicle_Number, Vehicle_Type, Start_time, End_time);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Error booking parking space', details: err.message });
  }
};