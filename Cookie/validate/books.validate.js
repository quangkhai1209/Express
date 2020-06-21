module.exports.validatePostNew = (req, res, next) => {
    let err = [];
    if (!req.body.name) {
        err.push('Name is require !!!');
    }
    if (!req.body.description) {
        err.push('Description is require !!!');
    }
    if (!req.body.cost) {
        err.push('Cost is require !!!');
    } if (err.length) {
        res.render("books/create", {
            values: req.body,
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
}