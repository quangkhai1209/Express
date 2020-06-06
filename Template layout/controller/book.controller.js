const shortid = require('shortid');
const db = require('../db');

module.exports.root = (req,res)=>{
    res.render('books/index',{
        books : db.get('books').value()
    });
};
module.exports.creatGet = (req,res)=>{
    console.log(db.get('books').value())
    res.render('books/create',{
        books : db.get('books').value()
    });
};
module.exports.createPost = (req,res)=>{
    req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books')
};
module.exports.editGet =(req,res)=>{
    const value = db.get('books').find({id : req.params.id}).value();
    res.render('books/edit',{
        book : value
    });
};
module.exports.editPost =(req,res)=>{
    db.get('books')
    .find({id : req.params.id})
    .assign({ name : req.body.name, description : req.body.description})
    .write();
    res.redirect('/books')
};
module.exports.deleteGet = (req,res)=>{
    const value = db.get('books').find({id : req.params.id}).value();
    res.render('books/delete',{
        book : value
    });
};
module.exports.deletePost =(req,res)=>{
    const id = req.params.id;
    db.get('books')
    .remove({ id: id })
    .write()
    // const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    // db.get('book').value().splice(removeIndex, 1);
    // db.get('book').write();
    res.redirect("/books");
};
module.exports.search =(req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('books').value().filter(function(item){
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    res.render("books/index", {
        books : arrFilter
    })
};