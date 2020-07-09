let db = require('../db');

module.exports.requireAuth = (req,res,next)=>{
    if(!req.cookies.cookies){
        res.redirect('/auth');
        return;
    }
    let user = db.get('users').find({ id : req.cookies.cookies}).value();
    if(!user){
        res.redirect('/auth');
        return;
    }
    next();

};
