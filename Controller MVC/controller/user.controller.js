const db = require('../db');
const shortId = require('shortid')

module.exports.root = function(req,res){
    res.render('user/listUser',{
        users : db.get('users').value()
    });
};
module.exports.createGet = (req,res)=>{
    res.render('user/create')
};
module.exports.createPost = (req,res)=>{
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    res.redirect('/user');
};
module.exports.editGet = (req,res)=>{
    const  id =  req.params.id;
    const arrFind = db.get('users').value().find((item)=>{
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    });
    res.render('user/edit',{
        user : arrFind
    });
};
module.exports.editPost = (req,res)=>{
    const id = req.params.id;
    db.get('users')
        .find({id : id})
        .assign({name : req.body.name, phone : req.body.phone})
        .write();
    res.redirect('/user')
};
module.exports.deleteGet = (req,res)=>{
    const id = req.params.id;
    const arrFind = db.get('users').value().find((item)=>{
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    });
    res.render('user/delete',{
        user: arrFind
    })
};
module.exports.deletePost =(req,res)=>{
    const id = req.params.id;
    db.get("users").remove({id : id}).write();
    res.redirect('/user');
};
module.exports.search = (req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('users').value().filter(function(item){
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    res.render("user/listUser", {
        users : arrFilter
    });
};