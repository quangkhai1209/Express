const express = require('express');
const book = express.Router();
const db = require('../db');
const shortID = require('shortid')

book.get('/', function (req, res) {
    res.render('book/listBook', {
        books: db.get('books').value()
    });
});

book.get('/add', function (req, res) {
    res.render('book/addBook');
});

book.post("/add", function (req, res) {
    req.body.id = shortID.generate();
    db.get('books').push(req.body).write();
    res.redirect('/book');
});

book.get("/edit/:id", function (req, res) {
    const id = req.params.id
    const arrFind = db.get('books').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    });
    res.render('book/edit', {
        book: arrFind
    });
});

book.post("/edit/:id", function (req, res) {
    db.get('books')
    .find({ id: req.params.id })
    .assign({ name: req.body.name, description: req.body.description, cost: req.body.cost })
    .write();
    res.redirect('/book')
});

book.get("/delete/:id", function (req, res) {
    const id = req.params.id
    const arrFind = db.get('books').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    });
    res.render('book/delete', {
        books: arrFind
    });
});

book.post("/delete/:id", function (req, res) {
    const id = req.params.id;
    db.get('books')
    .remove({ id: id })
    .write()
    // const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    // db.get('book').value().splice(removeIndex, 1);
    // db.get('book').write();
    res.redirect("/book");
});

book.get('/search',(req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('books').value().filter(function(item){
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    res.render("book/listBook", {
        books : arrFilter
    })
})

module.exports = book;