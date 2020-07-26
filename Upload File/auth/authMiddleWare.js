let db = require('../db');

module.exports.requireAuth = (req, res, next) => {
    const { cookies } = req.signedCookies;
    if (!cookies) {
        res.redirect('/auth');
        return;
    } else {
        let user = db.get('users').find({ id: cookies }).value();
        if (!user) {
            res.redirect('/auth');
            return;
        }
        res.locals.user = user;
        next();
    }
};
