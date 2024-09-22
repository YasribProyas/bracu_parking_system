// controllers/billController
const Bill = require('../models/billModel');
const db = require('../db');
const { v4: uuidv4 } = require('uuid'); // To generate unique Bill_id
const moment = require('moment'); // To calculate time differences
const BillCalculation = require('../models/billModel');

exports.getAllBills = (req, res) => {
    Bill.getAllBills((bills) => {
        res.render('bill_calculation', {bills});
    });
};

// Function to calculate total bill based on booking reservation
const calculateBill = (User_ID, callback) => {
    // Step 1: Fetch the booking details for the user
    const query = `
      SELECT User_ID, Car_Number, Car_Type, Start_time, End_time, Date
      FROM booking_reservation
      WHERE UserID = ?;
    `;
    db.query(query, [User_ID], (err, reservations) => {
      if (err) return callback(err, null);
  
      if (reservations.length === 0) {
        return callback(null, { message: 'No booking found for this user.' });
      }
  
      // Step 2: Calculate total time and bill
      reservations.forEach(reservation => {
        const { Car_Number, Car_Type, Start_time, End_time, Date } = reservation;
        
        // Calculate total time in hours (using moment.js)
        const startTime = moment(`${Date} ${Start_time}`);
        const endTime = moment(`${Date} ${End_time}`);
        const totalTime = moment.duration(endTime.diff(startTime)).asHours(); // Get total time in hours
        
        // Calculate bill based on Car_Type
        let rate = Car_Type.toLowerCase() === 'Four' ? 50 : 20;
        const totalBill = totalTime * rate;
  
        // Step 3: Insert into bill_calculation
        const billId = uuidv4(); // Generate unique Bill_id
        const insertBillQuery = `
          INSERT INTO bill_calculation (Bill_id, UserID, Car_Number, Car_Type, Total_time, Total_bill)
          VALUES (?, ?, ?, ?, ?, ?);
        `;
        db.query(insertBillQuery, [billId, UserID, Car_Number, Car_Type, totalTime, totalBill], (err, result) => {
          if (err) return callback(err, null);
          callback(null, { message: 'Bill calculated successfully', totalBill, totalTime });
        });
      });
    });
  };

exports.getAllBillings = (req, res) => {
  BillCalculation.findAll()
    .then(billings => {
      res.json(billings);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Failed to retrieve billings' });
    });
};