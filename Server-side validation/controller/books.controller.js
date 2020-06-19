const shortId = require('shortid');
const db = require('../db');

module.exports.root = (req,res)=>{
    res.render('books/index',{
        books : db.get('books').value()
    });
};
module.exports.getNew = (req,res)=>{
    res.render('books/new')
};
module.exports.postNew = (req,res)=>{
    req.body.id = shortId.generate();
    db.get('books').push(req.body).write();
    res.redirect('/books')
};
module.exports.getEdit = (req,res)=>{
    res.render('books/edit', {
        book: db.get('books').find({ id: req.params.id }).value()
    });
};
module.exports.postEdit = (req,res)=>{
    db.get('books')
        .find({ id: req.params.id })
        .assign({ name: req.body.name, description: req.body.description, cost: req.body.cost })
        .write();
    res.redirect('/books')
};
module.exports.getDelete = (req,res)=>{
    res.render('books/delete', {
        book: db.get('books').find({ id: req.params.id }).value()
    });
};
module.exports.postDelete = (req,res)=>{
    db.get('books')
        .remove({id : req.params.id})
        .write();
    res.redirect('/books')
};
module.exports.search = (req,res)=>{
    const query = req.query.q;
    const arrFilter = db.get('books').value().filter((item)=>{
        return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    res.render('books/index', {
        books : arrFilter
    })
};