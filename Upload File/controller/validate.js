module.exports.validatePostNewUsers = (req, res, next) => {
    let err = [];
    const {email, password, fullName, address, phoneNumber, age, level} = req.body;
    const data = {email, password, fullName, address, phoneNumber, age};
    if (!email) {
        err.push('Email is require !!!');
    }
    if (!password) {
        err.push('Password is require !!!');
    }
    if (!fullName) {
        err.push('Name is require !!!');
    }
    if (!address) {
        err.push('Address is require !!!');
    }
    if (!phoneNumber) {
        err.push('Phone number is require !!!');
    }
    if (!age) {
        err.push('Age is require !!!');
    }
    if (err.length) {
        console.log(data)
        res.render("users/index", {
            values: data,
            errs: err
        })
        return;
    }
    next();
};

module.exports.validateSearch = (req, res, next) => {
    if(!req.query.q){
        res.redirect('/books')
    }
    next()
};

module.exports.validatePostNewBooks = (req, res, next) => {
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
