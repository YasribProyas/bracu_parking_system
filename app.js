// app.js

// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const https = require('https');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const parkingSpaceRoutes = require('./routes/parkingSpaceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const billRoutes = require('./routes/billRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware for serving static files
app.use(express.static('public'));

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Use the router from your route files
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);
app.use('/parking-spaces', parkingSpaceRoutes);
app.use('/bookings', bookingRoutes);
app.use('/bills', billRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Routes for other buttons
app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});

app.get('/billing', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'billing.html'));
});

app.get('/payments', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'payments.html'));
});

// Example API route to get parking space data
const parkingSpaceController = require('./controllers/parkingSpaceController');
app.get('/api/parking-spaces', parkingSpaceController.getAllParkingSpace);

// API routes for billing and payments
const billController = require('./controllers/billController');
app.get('/api/billings', billController.getAllBillings);

const bookingController = require('./controllers/bookingController');
app.post('/api/book-parking', bookingController.bookParkingSpace);

const paymentController = require('./controllers/paymentController');
app.get('/api/payments', paymentController.getAllPayments);
app.get('/api/payments/:Bill_id/receipt', paymentController.printReceipt);

// HTTPS server options
const options = {
  key: fs.readFileSync('path/to/your/private-key.pem'),
  cert: fs.readFileSync('path/to/your/certificate.pem')
};

// Set the server port from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});
