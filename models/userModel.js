const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const { get } = require('https');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  },
  fees: {
    type: DataTypes.NUMBER,
    allowNull: false,
    defaultValue: 0.00
  }
}, {
  tableName: 'users',
  timestamps: false
});

const addUser = async (username, password, role = 'user') => {
  try {
    await User.create({ username, password, role });
    console.log('User added successfully');
  } catch (err) {
    console.error('Error adding user:', err);
  }
};

const findUser = async (username) => {
  try {
    return await User.findOne({ where: { username } });
  } catch (err) {
    console.error('Error finding user:', err);
    return null;
  }
};

const getAllUsers = async () => {
  try {
    return await User.findAll({
      attributes: ['id', 'username']
    });
  } catch (err) {
    console.error('Error finding user:', err);
    return null;
  }
};

const validateUser = async (username, password) => {
  try {
    const user = await findUser(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  } catch (err) {
    console.error('Error validating user:', err);
    return null;
  }
};

module.exports = { User, addUser, findUser, validateUser, getAllUsers };