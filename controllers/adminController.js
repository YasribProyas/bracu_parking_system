// controllers/adminController.js
const Admin = require('../models/adminModel');

exports.getAllAdmins = (req, res) => {
    Admin.getAllAdmins((admins) => {
        res.render('admin', {admins});
    });
};