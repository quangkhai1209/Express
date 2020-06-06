const db = require('../db');
const shortID = require('shortid');

module.exports.root = (req,res)=>{
    res.render('users/index',{
        users : db.get('users').value()
    })
};
module.exports.createGet = (req,res)=>{
    res.render('users/create')
};
module.exports.createPost = (req,res)=>{
    req.body.id = shortID.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
};
module.exports.editGet = (req,res)=>{
    const user = db.get('users').find({id : req.params.id}).value();
    res.render('users/edit',{
        user:user
    });
};
module.exports.editPost = (req,res)=>{
    db.get('users')
    .find({id: req.params.id})
    .assign({name : req.body.name, phone: req.body.phone})
    .write();
    res.redirect('/users')
};
module.exports.deleteGet = (req,res)=>{
    const user = db.get('users').find({id : req.params.id}).value();
    res.render('users/delete',{
        user:user
    });
};
module.exports.deletePost = (req,res)=>{
    const id = req.params.id;
    db.get('users')
    .remove({ id: id })
    .write()
    // const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    // db.get('book').value().splice(removeIndex, 1);
    // db.get('book').write();
    res.redirect("/users");
};
module.exports.search = (req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('users').value().filter(function(item){
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    res.render("users/index", {
        users : arrFilter
    })
};