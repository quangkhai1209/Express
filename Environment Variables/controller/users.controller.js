const bcrypt = require('bcrypt');
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
module.exports.postCreateNew = async (req, res) => {
    const { name, age, phone, pass } = req.body;
    const userData = {
        name,
        age,
        phone,
        pass: await bcrypt.hash(pass, 10),
        id: shortid.generate(),
        lv: 0,
        wrongLoginCount: 0
    };
    let errs = [];
    let temp = db.get('users').value().find((item) => {
        return item.phone == phone;
    });
    if (!temp) {
        db.get("users").push(userData).write();
        res.redirect('/users')
    } else {
        errs.push("Phone is same some where.")
        res.render('users/create', {
            errs: errs
        });
    }
};
module.exports.getUpdate = (req, res) => {
    const { id } = req.params;
    let data = db.get('users').find({ id }).value();
    res.render('users/update', {
        user: data
    })
};
module.exports.postUpdate = (req, res) => {
    const { name, age, phone } = req.body;
    const { id } = req.params;
    db.get('users')
        .find({ id: id })
        .assign({ name, age, phone })
        .write();
    res.redirect('/users');
};
module.exports.getDelete = (req, res) => {
    const { id } = req.params;
    res.render('users/delete', {
        user: db.get('users').find({ id: id }).value()
    })
};
module.exports.postDelete = (req, res) => {
    const { id } = req.params;
    db.get('users').remove({ id: id }).write();
    res.redirect('/users');
};
module.exports.search = (req, res) => {
    const { q } = req.query;
    const arrFilter = db.get('users').value().filter((item) => {
        return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: arrFilter
    });
};