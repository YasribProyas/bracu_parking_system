// controllers/authController.js
const path = require('path');
const userModel = require('../models/userModel');
const { log } = require('console');

const register = async (req, res) => {
    const { username, password } = req.body;
    const userExists = await userModel.findUser(username);
    if (userExists) {
        console.log(userExists);
        return res.status(400).send('<h1>User already exists</h1><p><a href="/register">Go back to register</a></p>');
    }
    userModel.addUser(username, password);
    req.session.user = userModel.validateUser(username, password, "client"); // Set the session
    res.status(201).redirect('/');
};

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await userModel.validateUser(username, password);
    if (!user) {
        return res.status(400).send('<h1>Invalid credentials</h1><p><a href="/login">Go back to login</a> or <a href="/register">go to register</a></p>');
    }
    console.log(user);

    req.session.user = { ...user, role: user.dataValues.role, id: user.dataValues.id }; // Set the session
    if (user.role === 'admin') return res.redirect('/admin');
    res.redirect('/');
};

module.exports = { register, login };