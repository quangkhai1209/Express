const db = require('../db');
const shortId = require('shortid');

module.exports.root = (req, res) => {
    res.render('transaction/index', {
        transactions: db.get('transaction').value(),
    })
};
module.exports.createGet =(req, res) => {
    res.render('transaction/create', {
        users: db.get('users').value(),
        books: db.get('books').value()
    })
};
module.exports.createPost = (req, res) => {
    var id = shortId.generate();
    var userId = req.body.userId;
    var bookId = req.body.bookId;
    var userName = db.get('users').find({ id: userId }).value().name;
    var bookTitle = db.get('books').find({ id: bookId }).value().name;
    var isComplete = false;
    var transaction = { id, userId, bookId, userName, bookTitle, isComplete };
    db.get('transaction').push(transaction).write();
    res.redirect('/transaction');
};
module.exports.complete = (req, res) => {
    var id = req.params.id;
    db.get('transaction').find({ id: id}).assign({isComplete: true}).write();
    res.redirect('/transaction');
};