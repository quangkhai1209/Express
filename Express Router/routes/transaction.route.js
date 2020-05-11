const express = require('express');
const transaction = express.Router();
const db = require('../db');
const shortId = require('shortid');

transaction.get('/:id',(req,res)=>{
    const listBorrow = db.get('transaction').value().filter((item)=>{
        return item.userId === req.params.id;
    });
    const book = db.get('books').value().map((item)=>{
        return item
    });
    const result = listBorrow.map(function(item){
        for(let i = 0; i < book.length; i++){
            if(item.bookId === book[i].id){
                return book[i];
            }
        };
    });
    res.render('transaction/transaction',{
        books: db.get("books").value(),
        transaction : result
    })
})
transaction.post('/:id',(req,res)=>{
    const id = shortId.generate();
    req.body.id = id;
    req.body.userId = req.params.id;
    req.body.bookId = req.body.bookId;
    db.get('transaction').push(req.body).write();
    res.redirect("/transaction/" + req.params.id)
})


module.exports = transaction;