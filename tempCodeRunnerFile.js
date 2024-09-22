// app.js

// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const https = require('https');
const fs = require('fs');

// Import routes
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const parkingSpaceRoutes = require('./routes/parkingSpaceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const billRoutes = require('./routes/billRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Load environment variables
dotenv.config();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware for serving static files like CSS or images
app.use(express.static('public'));

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Use the router from your route files
app.use('/users', userRoutes);       // Route for user-related data
app.use('/admin', adminRoutes);      // Route for admin-related data
app.use('/parking-spaces', parkingSpaceRoutes);  // Route for parking spaces
app.use('/bookings', bookingRoutes); // Route for bookings
app.use('/bills', billRoutes);       // Route for bills
app.use('/payments', paymentRoutes); // Route for payments
app.use('/reviews', reviewRoutes);   // Route for reviews

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the BRACU Parking System');
});

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.get('/', (req, res) => {
  res.send('Welcome to the BRACU Parking System');
});

// Middleware for serving static files (CSS, JS, etc.)
app.use(express.static('public'));

// View engine setup (if you are using EJS or another template engine)
app.set('view engine', 'ejs');

// Route to serve the homepage (parking_space data)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Routes for other buttons (add additional routes as needed)
app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});

app.get('/billing', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'billing.html'));
});

app.get('/payments', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'payments.html'));
});

// Example route to get parking space data
const parkingSpaceController = require('./controllers/parkingSpaceController');
app.get('/api/parking-spaces', parkingSpaceController.getAllParkingSpaces);

const billingController = require('./controllers/billingController');
app.get('/api/billings', billingController.getAllBillings);

const bookingController = require('./controllers/bookingController');
app.post('/api/book-parking', bookingController.bookParkingSpace);

const paymentController = require('./controllers/paymentController');
app.get('/api/payments', paymentController.getAllPayments);
app.get('/api/payments/:Bill_id/receipt', paymentController.printReceipt);

const options = {
  key: fs.readFileSync('path/to/your/private-key.pem'),
  cert: fs.readFileSync('path/to/your/certificate.pem')
};

https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});

// Set the server port from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});