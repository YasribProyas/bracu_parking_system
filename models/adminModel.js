const db = require('../db');

const Admin = {
  getAllAdmins: (callback) => {
    const query = 'SELECT * FROM admin';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = Admin;
