let db = require('../db');
let shortid = require('shortid');

module.exports.getIndex = (req, res) => {
    let data = db.get('users').value();
    res.render('users/index', {
        users: data
    });
};
module.exports.getCreateNew = (req, res) => {
    res.render('users/create');
};
module.exports.postCreateNew = (req, res) => {
    req.body.id = shortid.generate();
    db.get("users").push(req.body).write();
    res.redirect('/users')
};
module.exports.getUpdate = (req, res) => {
    let data = db.get('users').find({ id: req.params.id }).value();
    res.render('users/update', {
        user: data
    })
};
module.exports.postUpdate = (req, res) => {
    db.get('users')
        .find({ id: req.params.id })
        .assign({ name: req.body.name, age: req.body.age, phone: req.body.phone })
        .write();
    res.redirect('/users');
};
module.exports.getDelete = (req, res) => {
    res.render('users/delete', {
        user: db.get('users').find({ id: req.params.id }).value()
    })
};
module.exports.postDelete = (req, res) => {
    db.get('users').remove({ id: req.params.id }).write();
    res.redirect('/users');
};
module.exports.search = (req, res) => {
    const query = req.query.q;
    const arrFilter = db.get('users').value().filter((item)=>{
        return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users : arrFilter
    });
}