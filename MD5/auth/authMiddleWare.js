let db = require('../db');
let express = require("express");

module.exports.requireAuth = (req,res,next)=>{
    console.log(req.cookies, req.signedCookies)
    if(!req.signedCookies){
        res.redirect('/auth');
        return;
    };
    let user = db.get('users').find({ id : req.signedCookies.cookies}).value();
    if(!user){
        res.redirect('/auth');
        return;
    };
    res.locals.u = user;
    next();

};
