const db = require('../db');
const { Model, DataTypes } = require('sequelize');

// class Booking extends Model { }

// Booking.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   UserID: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   Location_ID: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   Vehicle_Number: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   Vehicle_Type: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   Start_time: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   End_time: {
//     type: DataTypes.DATE,
//     allowNull: false
//   },
//   fees: {
//     type: DataTypes.FLOAT,
//     allowNull: false,
//     defaultValue: 0.0
//   }
// }, {
//   sequelize: db,
//   modelName: 'Booking',
//   tableName: 'booking_reservation',
//   timestamps: false
// });

// module.exports = Booking;


const Booking = {
  getAllBookings: (callback) => {
    const query = 'SELECT * FROM booking_reservation';
    db.query(query, (err, results) => {
      if (err) throw err;
      callback(results);
    });
  }
};

module.exports = Booking;