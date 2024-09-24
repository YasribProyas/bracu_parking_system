// const db = require('../db');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const Payment = sequelize.define('Payment', {
  Bill_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  User_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  Receipt: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'payments',
  timestamps: false
});

module.exports = Payment;