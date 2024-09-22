// controllers/userController.js
const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  User.getAllUsers((users) => {
    res.render('user', { users });
  });
};
