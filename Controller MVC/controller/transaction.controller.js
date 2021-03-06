const db = require('../db');
const shoerId   =require('shortid');

module.exports.rootGet = (req, res) => {
    const id = req.params.id;
    const arrFindUser = db.get('users').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    });
    const listBorrow = db.get('transaction').value().filter((item)=>{
        if(item.isComplete == true){
            return item.UserId === req.params.id;
        }
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
        books: book,
        transaction : result,
        user : arrFindUser,
        listBorrow : listBorrow
    })
};
module.exports.rootPost =(req,res)=>{
    req.body.id = shortId.generate();
    req.body.isComplete = true;
    req.body.UserId = req.params.id;
    db.get('transaction').push(req.body).write();
    res.redirect('back');
}
module.exports.complete =(req,res)=>{
    const id = req.params.id;
    db.get('transaction')
    .find({ id: id})
    .assign({ isComplete : false })
    .write();
    res.redirect('back')
};