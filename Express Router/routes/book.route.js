const express = require('express');
const book = express.Router();
const db = require('../db');
const shortId = require('shortid');

book.get('/login',(req,res)=>{
    res.render('adm/loginAdm');
})

book.post('/loginAdm',(req,res)=>{
    const username = db.get('admin').value();
    const result = username.find(function(item){
        return item.user_name === req.body.username && item.password.toString() == req.body.pass;
    });
    if(result){
        res.redirect("/admin/books")
    } else{
        res.redirect("/admin/login");
    }
})

book.get('/books',(req,res)=>{
    res.render('adm/fun/interfaceAdm',{
        books: db.get("books").value()
    });
})
book.get('/create',(req,res)=>{
    res.render('adm/fun/create');
})

book.post('/create',(req,res)=>{
    req.body.id = shortId.generate();
    db.get('books').push(req.body).write();
    res.redirect("/admin/books")
})

book.get("/edit/:id",(req,res)=>{
    const id = req.params.id;
    const book = db.get('books').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('adm/fun/Edit', {
        book : book
    })
})

book.post("/edit/:id",(req,res)=>{
    db.get('books')
        .find({ id: req.params.id })
        .assign({ title: req.body.title, description: req.body.Description })
        .write();
    res.redirect('/admin/books')
})

book.get("/delete/:id",(req,res)=>{
    const id = req.params.id;
    const book = db.get('books').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('adm/fun/delete', {
        book : book
    })
})

book.post("/delete/:id",(req,res)=>{
    const id = req.params.id;
    db.get('books')
    .remove({ id: id })
    .write()
    // const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    // db.get('book').value().splice(removeIndex, 1);
    // db.get('book').write();
    res.redirect("/admin/books");
})

book.get('/search',(req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('books').value().filter(function(item){
        return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    res.render("adm/fun/interfaceAdm", {
        books : arrFilter
    })
})

module.exports = book;