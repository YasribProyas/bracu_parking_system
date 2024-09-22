// models/userModel.js
const db = require('../db');

const User = {
  getAllUsers: (callback) => {
    const query = 'SELECT * FROM user';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = User;
