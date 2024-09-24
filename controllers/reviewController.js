const Reviewe = require('../models/reviewModel');

exports.getAllReviewes = (req, res) => {
    Reviewe.getAllReviewes((revs) => {
        res.render('review', {revs});
    });
;}

// Function to add a review
const addReview = (req, res) => {
  const { rating, type, feedback } = req.body;

  // Logic to add a review
  res.status(200).json({ message: 'Review added successfully' });
};

// Function to get all reviews
const getReviews = (req, res) => {
  // Logic to retrieve all reviews
  res.status(200).json({ reviews: 'List of reviews' });
};

module.exports = {
  addReview,
  getReviews
};