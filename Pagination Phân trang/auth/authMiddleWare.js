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

module.exports.checkPermission = (req, res, next) => {
    const user = res.locals.user;
    if (user.lv == 1) {
        res.redirect('/transaction');
        next();
    }
    if (user.lv == 0) {
        res.redirect('/auth/' + user.id);
        next();
    }
};
