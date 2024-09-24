const db = require('../db');

const ComUser = {
  getAllComs: (callback) => {
    const query = 'SELECT * FROM common_user';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = ComUser;