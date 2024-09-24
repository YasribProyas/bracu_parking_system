// controllers/userController.js
const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  console.log('Fetching all users');

  User.getAllUsers().then(
    (users) => {
      // res.render('user', { users });
      // console.log(users);

      return res.status(200).json(users);
    }
  )
};
