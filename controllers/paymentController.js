const Payment = require('../models/paymentModel');
const BillCalculation = require('../models/billModel'); 
const BookingReservation = require('../models/bookingModel'); 
const ParkingSpace = require('../models/parkingSpaceModel');

// Admin processing payment based on UserID
const processPayment = async (req, res) => {
    try {
      const { UserID, Receipt } = req.body;

      // Step 1: Find the bill based on UserID
      const bill = await BillCalculation.findOne({ where: { UserID } });

      if (!bill) {
        return res.status(404).json({ message: 'Bill not found for the user' });
      }

      // Step 2: Get Car_Number from booking_reservation table
      const reservation = await BookingReservation.findOne({ where: { User_id: UserID, Car_Number: bill.Car_Number } });

      if (!reservation) {
        return res.status(404).json({ message: 'Car number not found' });
      }

      // Step 3: Insert into payment table
      const payment = await Payment.create({
        Bill_id: bill.Bill_id,
        Car_Number: reservation.Car_Number,
        Paid: 'yes', // Mark as paid
        Receipt: Receipt
      });

      return res.json({ message: 'Payment processed successfully', payment });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error processing payment' });
    }
};

// Admin prints receipt using Bill_ID
const printReceipt = async (req, res) => {
    try {
      const { Bill_id } = req.params;

      // Step 1: Find payment details by Bill_ID
      const payment = await Payment.findOne({ where: { Bill_id } });

      if (!payment) {
        return res.status(404).json({ message: 'Payment not found' });
      }

      return res.json({
        message: 'Receipt details',
        receipt: payment.Receipt
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error retrieving receipt' });
    }
};

// Process payment and remove booking
const processPostPayment = async (req, res) => {
    try {
      const { User_id } = req.body;

      // Step 1: Find the Location_ID from booking_reservation before deleting
      const booking = await BookingReservation.findOne({ where: { User_id } });
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found for this user' });
      }
      const { Location_ID } = booking;

      // Step 2: Delete the UserID from both booking_reservation and bill_calculation
      await BookingReservation.destroy({ where: { User_id } });
      await BillCalculation.destroy({ where: { User_id } });

      // Step 3: Add the Location_ID back to the parking_space table
      await ParkingSpace.create({
        Location_ID: Location_ID,
        available: true // Assuming 'available' is a column in the parking_space table
      });

      res.status(200).json({ message: 'Payment processed, booking deleted, and parking space restored.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error processing payment and restoring parking space' });
    }
};


// Function to get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.findAll();  // Assuming you're using Sequelize or similar ORM
        res.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        res.status(500).json({ message: 'Error fetching payments' });
    }
};
  
exports.printReceipt = (req, res) => {
    const { Bill_id } = req.params;
    Payment.findOne({ where: { Bill_id } })
      .then(payment => {
        if (!payment) {
          return res.status(404).json({ message: 'Payment not found' });
        }
        res.json({ receipt: payment.Receipt });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'Error retrieving receipt' });
      });
};

// Export the defined functions
module.exports = {
    processPayment,
    printReceipt,
    processPostPayment,
    getAllPayments,
    printReceipt
};
