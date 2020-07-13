let db = require('../db');
let shortid = require('shortid');

module.exports.getIndex = (req, res) => {
    res.render('books/index', {
        books: db.get('books').value()
    })
};

module.exports.getCreate = (req, res) => {
    res.render('books/create', {
        books: db.get('books').value()
    })
};
module.exports.postCreate = (req, res) => {
    const { name, description, cost } = req.body;
    const dataNewBooks = {
        id: shortid.generate(),
        name,
        description,
        cost
    }
    req.body.id = shortid.generate();
    db.get("books").push(dataNewBooks).write();
    res.redirect('/books')
};
module.exports.getUpdate = (req, res) => {
    res.render('books/update', {
        book: db.get('books').find({ id: req.params.id }).value()
    })
}
module.exports.postUpdate = (req, res) => {
    const { name, description, cost } = req.body;
    db.get('books')
        .find({ id: req.params.id })
        .assign({ name, description, cost })
        .write();
    res.redirect('/books');
}
module.exports.getDelete = (req, res) => {
    const { id } = req.params;
    res.render('books/delete', {
        book: db.get('books').find({ id }).value()
    })
}
module.exports.postDelete = (req, res) => {
    const { id } = req.params;
    db.get('books').remove({ id }).write();
    res.redirect('/books')
}
module.exports.search = (req, res) => {
    const { q } = req.query;
    const arrFilter = db.get('books').value().filter((item) => {
        return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('books/index', {
        books: arrFilter
    });
}