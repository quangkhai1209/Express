const express = require('express');
const router = express.Router();
const db = require('../db');
const shortId = require('shortid');


router.get('/user',(req,res)=>{
    res.render('user/fun/user',{
        users : db.get('users').value()
    });
})

router.get('/create',(req,res)=>{
    res.render('user/fun/create');
})
router.post('/create',(req,res)=>{
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    console.log(req.body)
    res.redirect("/user/user")
})

router.get('/edit/:id',(req,res)=>{
    const id = req.params.id;
    const user = db.get('users').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('user/fun/Edit', {
        user : user
    })
})
router.post("/edit/:id",(req,res)=>{
    db.get('users')
        .find({ id: req.params.id })
        .assign({ name: req.body.name, phone: req.body.phone })
        .write();
    res.redirect('/user/user')
})

router.get("/delete/:id",(req,res)=>{
    const id = req.params.id;
    const user = db.get('users').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('user/fun/deleteUser', {
        user : user
    })
})

router.post("/delete/:id",(req,res)=>{
    const id = req.params.id;
    db.get('users')
    .remove({ id: id })
    .write()
    // const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    // db.get('book').value().splice(removeIndex, 1);
    // db.get('book').write();
    res.redirect("/user/user");
})

router.get('/search',(req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('users').value().filter(function(item){
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    res.render("user/fun/user", {
        users : arrFilter
    })
})


module.exports = router;