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
    req.body.id = shortid.generate();
    db.get("books").push(req.body).write();
    res.redirect('/books')
};
module.exports.getUpdate = (req, res) => {
    res.render('books/update', {
        book: db.get('books').find({ id: req.params.id }).value()
    })
}
module.exports.postUpdate = (req, res) => {
    db.get('books')
        .find({ id: req.params.id })
        .assign({ name: req.body.name, description: req.body.description, cost: req.body.cost })
        .write();
    res.redirect('/books');
}
module.exports.getDelete = (req, res) => {
    res.render('books/delete',{
        book : db.get('books').find({id : req.params.id}).value()
    })
}
module.exports.postDelete = (req, res) => {
    db.get('books').remove({id : req.params.id}).write();
    res.redirect('/books')
}
module.exports.search = (req,res)=>{
    const query = req.query.q;
    const arrFilter = db.get('books').value().filter((item)=>{
        return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    res.render('books/index', {
        books : arrFilter
    });
}