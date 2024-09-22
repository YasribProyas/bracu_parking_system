const express = require('express');
const router = express.Router();
const { addReview, getReviews } = require('../controllers/reviewController'); // Make sure the names match with what you export in reviewController.js

// Route to add a review (POST)
router.post('/add-review', addReview);

// Route to get all reviews (GET)
router.get('/reviews', getReviews);

module.exports = router;
