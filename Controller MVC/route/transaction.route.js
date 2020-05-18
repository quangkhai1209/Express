const express = require('express');
const transaction = express.Router();
const db = require('../db');
const shortId = require('shortid');

transaction.get('/:id', (req, res) => {
    const id = req.params.id;
    const arrFindUser = db.get('users').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    });
    const listBorrow = db.get('transaction').value().filter((item)=>{
        return item.UserId === req.params.id;
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
        transaction : result,
        user : arrFindUser
    })
});

transaction.post('/:id',(req,res)=>{
    req.body.id = shortId.generate();
    req.body.UserId = req.params.id;
    db.get('transaction').push(req.body).write();
    res.redirect('/transaction/'+ req.params.id);
})


module.exports = transaction;