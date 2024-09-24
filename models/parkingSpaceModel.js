const db = require('../db');

const Space = {
  getAllSpace: (callback) => {
    const query = 'SELECT * FROM parking_space';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = Space;