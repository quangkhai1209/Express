const shortId = require('shortid');
const db = require('../db');

module.exports.root = (req,res)=>{
    res.render('users/index',{
        users : db.get('users').value()
    })
};
module.exports.getNew = (req,res)=>{
    res.render('users/new')
};
module.exports.postNew = (req,res)=>{
    req.body.id = shortId.generate();;
    db.get('users').push(req.body).write();
    res.redirect('/users');
};
module.exports.getEdit = (req,res)=>{
    res.render('users//edit',{
        user : db.get('users').find({id : req.params.id}).value()
    })
};
module.exports.postEdit = (req,res)=>{
    db.get('users')
    .find({id : req.params.id})
    .assign({name : req.body.name, age : req.body.age, phone : req.body.phone})
    .write();
    res.redirect('/users');
};
module.exports.getDelete = (req,res)=>{
    res.render('users/delete', {
        user : db.get('users').find({id : req.params.id}).value()
    })
};
module.exports.postDelete = (req,res)=>{
    db.get('users').remove({ id: req.params.id }).write();
    res.redirect('/users');
};
module.exports.search = (req,res)=>{
    const query = req.query.q;
    const arrFilter = db.get('users').value().filter((item)=>{
        return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users : arrFilter
    });
};