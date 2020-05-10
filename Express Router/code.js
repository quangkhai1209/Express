const express = require('express');
const app = express();
const port = 98;
const lowDb = require('lowdb');
const fileSync = require("lowdb/adapters/FileSync");
const adapters = new fileSync('db.json');
const db = lowDb(adapters);
const shortId = require('shortid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => {
    console.log(port + " IS RUNNING !")
});

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/admin/login',(req,res)=>{
    res.render('adm/loginAdm');
})
app.post('/admin/loginAdm',(req,res)=>{
    const username = db.get('admin').value();
    const result = username.find(function(item){
        return item.user_name === req.body.username && item.password.toString() == req.body.pass;
    });
    if(result){
        res.redirect("/admin/books")
    } else{
        res.redirect("/admin/login");
    }
})

app.get('/admin/books',(req,res)=>{
    res.render('adm/fun/interfaceAdm',{
        books: db.get("books").value()
    });
})
app.get('/admin/create',(req,res)=>{
    res.render('adm/fun/create');
})
app.post('/admin/create',(req,res)=>{
    req.body.id = shortId.generate();
    db.get('books').push(req.body).write();
    console.log(req.body)
    res.redirect("/admin/books")
})
app.get("/admin/edit/:id",(req,res)=>{
    const id = req.params.id;
    const book = db.get('books').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('adm/fun/Edit', {
        book : book
    })
})

app.post("/admin/edit/:id",(req,res)=>{
    db.get('books')
        .find({ id: req.params.id })
        .assign({ title: req.body.title, description: req.body.Description })
        .write();
    res.redirect('/admin/books')
})

app.get("/admin/delete/:id",(req,res)=>{
    const id = req.params.id;
    const book = db.get('books').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('adm/fun/delete', {
        book : book
    })
})

app.post("/admin/delete/:id",(req,res)=>{
    const id = req.params.id;
    db.get('books')
    .remove({ id: id })
    .write()
    // const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    // db.get('book').value().splice(removeIndex, 1);
    // db.get('book').write();
    res.redirect("/admin/books");
})

app.get('/admin/search',(req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('books').value().filter(function(item){
        return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    res.render("adm/fun/interfaceAdm", {
        books : arrFilter
    })
})


app.get('/users/user',(req,res)=>{
    res.render('user/fun/user',{
        users : db.get('users').value()
    });
})

app.get('/user/create',(req,res)=>{
    res.render('user/fun/create');
})
app.post('/user/create',(req,res)=>{
    req.body.id = shortId.generate();
    db.get('users').push(req.body).write();
    console.log(req.body)
    res.redirect("/users/user")
})

app.get('/user/edit/:id',(req,res)=>{
    const id = req.params.id;
    const user = db.get('users').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('user/fun/Edit', {
        user : user
    })
})
app.post("/user/edit/:id",(req,res)=>{
    db.get('users')
        .find({ id: req.params.id })
        .assign({ name: req.body.name, phone: req.body.phone })
        .write();
    res.redirect('/users/user')
})

app.get("/user/delete/:id",(req,res)=>{
    const id = req.params.id;
    const user = db.get('users').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('user/fun/deleteUser', {
        user : user
    })
})

app.post("/user/delete/:id",(req,res)=>{
    const id = req.params.id;
    db.get('users')
    .remove({ id: id })
    .write()
    // const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    // db.get('book').value().splice(removeIndex, 1);
    // db.get('book').write();
    res.redirect("/users/user");
})

app.get('/users/search',(req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('users').value().filter(function(item){
        return item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    res.render("user/fun/user", {
        users : arrFilter
    })
})
