// app.js

// Import necessary modules
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
const http = require('http');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Create MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '12345678',
  database: process.env.DB_NAME || 'bracu_parking',
});

// initialize express app
const app = express();

// Middleware for serving static files
app.use(express.static('views'));
// Set up session store
const sessionStore = new MySQLStore({}, connection);

// Set up session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const userRoutes = require('./routes/userRoutes');
// const adminRoutes = require('./routes/adminRoutes');
const parkingSpaceRoutes = require('./routes/parkingSpaceRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const billRoutes = require('./routes/billRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes'); // Add this line

const { User } = require('./models/userModel');

// Set the view engine to EJS
app.set('view engine', 'ejs');


// Parse URL-encoded bodies (for form submissions)
// app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);
// app.use('/admin', adminRoutes);
app.use('/parking-spaces', parkingSpaceRoutes);
app.use('/bookings', bookingRoutes);
app.use('/bills', billRoutes);
app.use('/payments', paymentRoutes);
app.use('/reviews', reviewRoutes);
app.use('/reviews', reviewRoutes);
app.use('/auth', authRoutes);

// Home route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// Home route with session check
app.get('/', (req, res) => {
  console.log('Home route accessed');
  if (!req.session.user) {
    console.log('No session found, redirecting to login');
    return res.redirect('/login');
  }
  console.log('Session found, serving dash.html');
  res.sendFile(path.join(__dirname, 'views', 'dash.html'));
});

app.get('/admin', (req, res) => {

  if (!req.session.user) {
    console.log('No session found, redirecting to login');
    return res.redirect('/login');

  }
  // console.log(req.session);
  if (req.session.user.role !== 'admin') {
    return res.redirect('/');
  }
  console.log('admin found, serving adminDash.html');
  res.sendFile(path.join(__dirname, 'views', 'adminDash.html'));

});
app.get('/admin/totals', async (req, res) => {
  try {
    // Calculate total due
    const totalDue = await User.sum('fees');

    // Calculate total earnings
    const bookingController = require('./controllers/bookingController');
    const bookingFees = await bookingController.getTotalFees(req, res);

    res.json({ totalDue, totalEarnings: bookingFees - totalDue });
  } catch (err) {
    console.error('Error fetching totals:', err);
    res.status(500).send('Internal Server Error');
  }
});


// Routes for other buttons
app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'booking.html'));
});

app.get('/billing', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'billing.html'));
});

app.get('/payments', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'payment.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
});
// Example API route to get parking space data
// const parkingSpaceController = require('./controllers/parkingSpaceController');
// app.get('/api/parking-spaces', parkingSpaceController.getAllParkingSpace);

// API routes for billing and payments
const billController = require('./controllers/billController');
app.get('/api/billings', billController.getAllBillings);

// const bookingController = require('./controllers/bookingController');
// app.post('/api/book-parking', bookingController.bookParkingSpace);

const paymentController = require('./controllers/paymentController');
app.get('/api/payments', paymentController.getAllPayments);
app.get('/api/payments/:Bill_id/receipt', paymentController.printReceipt);

// HTTPS server options
//const options = {
// key: fs.readFileSync(path.join(__dirname, 'certs', 'private-key.pem')),
// cert: fs.readFileSync(path.join(__dirname, 'certs', 'certificate.pem'))
//};

// Set the server port from the environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Start the HTTPS server
app.listen(PORT, () => {
  console.log(`HTTPS Server running on port ${PORT}`);
});
