const db = require('../db');

const Payment = {
  getAllPayments: (callback) => {
    const query = 'SELECT * FROM payment';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    Bill_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    Car_Number: DataTypes.STRING,
    Paid: {
      type: DataTypes.ENUM('yes', 'no'),
      defaultValue: 'no'
    },
    Receipt: DataTypes.STRING
  }, {
    tableName: 'payment',
    timestamps: false
  });

  return Payment;
};


module.exports = Payment;