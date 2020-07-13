let db = require('../db');
let shortid = require('shortid');

module.exports.getIndex = (req, res, next) => {
    let text = "Chưa nghịch bậy :>";
    const items = db.get('transaction').value();
    res.render('transaction/index', {
        transactions: items,
        users: db.get('users').value(),
        books: db.get("books").value(),
        text: text
    });
}
module.exports.postNew = (req, res) => {
    const date = new Date();
    const { userId, bookId } = req.body;
    const dataTran = {
        id: shortid.generate(),
        userId,
        bookId,
        userName: db.get('users').find({ id: userId }).value().name,
        bookTitle: db.get('books').find({ id: bookId }).value().name,
        isComplete: false,
        dateCurrent: '' + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear(),
    }
    db.get('transaction').push(dataTran).write();
    res.redirect('/transaction');
};

module.exports.complete = (req, res) => {
    const { id } = req.params;
    const date = new Date();
    const dateComplete = '' + date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    let text = "Chưa nghịch bậy :>";

    if (db.get('transaction').find({ id: id }).value()) {
        db.get('transaction').find({ id: id }).assign({ isComplete: true, dateComplete: dateComplete }).write();
        res.redirect('/transaction');
    } else {
        text = "Nghịch bậy rồi :>";
        const items = db.get('transaction').value();
        res.render('transaction/index', {
            transactions: items,
            users: db.get('users').value(),
            books: db.get("books").value(),
            text: text
        });
    };
};
module.exports.search = (req, res) => {
    const { nameUser, nameBook } = req.query;
    if (!nameUser && !nameBook) {
        res.redirect('/transaction')
        return;
    };
    // fail fast
    let text = "Chưa nghịch bậy :>";
    let search;
    if (!nameBook) {
        search = db.get('transaction').value().filter((item) => { // array.includes
            return item.userName.toLowerCase().indexOf(nameUser.toLowerCase()) !== -1;
        });
    };
    if (!nameUser) {
        search = db.get('transaction').value().filter((item) => {
            return item.bookTitle.toLowerCase().indexOf(nameBook.toLowerCase()) !== -1;
        });
    };
    res.render('transaction/index', {
        transactions: search,
        users: db.get('users').value(),
        books: db.get("books").value(),
        text: text
    });
};