module.exports.validatePostNew = (req, res, next) => {
    let err = [];
    if (!req.body.name) {
        err.push('Name is require !!! ');
    }
    if (req.body.name.length > 30) {
        err.push('Max length of your name is 30')
    }
    if (!req.body.age) {
        err.push('Age is require !!! ');
    }
    if (!req.body.phone) {
        err.push('Phone is require !!! ');
    }
    if (err.length) {
        res.render('users/create', {
            errs: err,
            values: req.body,
        })
        return;
    }
    next();
}
