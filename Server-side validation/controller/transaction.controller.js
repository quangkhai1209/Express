const db = require('../db');
const shortId = require('shortid');

module.exports.root = (req,res)=>{
    const items = db.get('transaction').value();
    res.render('transaction/index',{
        transactions : items,
        users : db.get('users').value(),
        books : db.get("books").value()
    });
};
module.exports.postNew = (req,res)=>{
    const id = shortId.generate();
    const userId = req.body.userId;
    const bookId = req.body.bookId;
    const userName = db.get('users').find({ id: userId }).value().name;
    const bookTitle = db.get('books').find({ id: bookId }).value().name;
    const isComplete = false;
    const date = new Date();
    const dateCurrent = ''+date.getDay()+"-"+(date.getMonth() + 1) + "-" + date.getFullYear();
    const transaction = { id, userId, bookId, userName, bookTitle, dateCurrent, isComplete };
    db.get('transaction').push(transaction).write();
    res.redirect('/transaction');
};
module.exports.complete = (req,res)=>{
    const id = req.params.id;
    const date = new Date();
    const dateComplete = ''+date.getDay()+"-"+(date.getMonth() + 1) + "-" + date.getFullYear();
    db.get('transaction').find({ id: id}).assign({isComplete: true, dateComplete : dateComplete}).write();
    res.redirect('/transaction');
};
module.exports.search = (req,res)=>{
    const nameUser = req.query.nameUser;
    const nameBook = req.query.nameBook;
    let search;
    if(nameBook == ""){
        search = db.get('transaction').value().filter((item)=>{
            return item.userName.toLowerCase().indexOf(nameUser.toLowerCase()) !== -1;
        });
    }
    if(nameUser == ""){
        search = db.get('transaction').value().filter((item)=>{
            return item.bookTitle.toLowerCase().indexOf(nameBook.toLowerCase()) !== -1;
        });
    }

    res.render('transaction/index',{
        transactions : search ,
        users : db.get('users').value(),
        books : db.get("books").value()
    })
};