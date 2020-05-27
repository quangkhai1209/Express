const db = require('../db');
const shortID = require('shortid');


module.exports.root = function (req, res) {
    res.render('book/listBook', {
        books: db.get('books').value()
    });
};

module.exports.addGet =function (req, res) {
    res.render('book/addBook');
};
module.exports.addPost =function (req, res) {
    req.body.id = shortID.generate();
    db.get('books').push(req.body).write();
    res.redirect('/book');
};
module.exports.editGet = function (req, res) {
    const id = req.params.id
    const arrFind = db.get('books').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    });
    res.render('book/edit', {
        book: arrFind
    });
};
module.exports.editPost =function (req, res) {
    db.get('books')
    .find({ id: req.params.id })
    .assign({ name: req.body.name, description: req.body.description, cost: req.body.cost })
    .write();
    res.redirect('/book')
};
module.exports.deleteGet =function (req, res) {
    const id = req.params.id
    const arrFind = db.get('books').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    });
    res.render('book/delete', {
        books: arrFind
    });
};
module.exports.deletePost = function (req, res) {
    const id = req.params.id;
    db.get('books')
    .remove({ id: id })
    .write()
    // const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    // db.get('book').value().splice(removeIndex, 1);
    // db.get('book').write();
    res.redirect("/book");
};
module.exports.search =(req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('books').value().filter(function(item){
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    res.render("book/listBook", {
      books : arrFilter
    });
};