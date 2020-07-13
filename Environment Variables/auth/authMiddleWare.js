let db = require('../db');
let express = require("express");

module.exports.requireAuth = (req, res, next) => {
    const { cookies } = req.signedCookies;
    if (!cookies) {
        res.redirect('/auth');
        return;
    };
    let user = db.get('users').find({ id: cookies }).value();
    if (!user) {
        res.redirect('/auth');
        return;
    };
    res.locals.u = user;
    next();

};
