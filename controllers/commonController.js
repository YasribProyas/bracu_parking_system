const ComUser = require('../models/commonUserModel');

exports.getAllComs = (req, res) => {
    ComUser.getAllComs((comos) => {
        res.render('common_user', {comos});
    });
};