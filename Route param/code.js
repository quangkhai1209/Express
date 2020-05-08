const express = require('express');
const app = express();
const port = 98;
const lowDb = require('lowdb');
const fileSync = require("lowdb/adapters/FileSync");
const adapters = new fileSync('db.json');
const db = lowDb(adapters);
const shoertId = require('shortid');


app.use(express.json());
app.use(express.urlencoded({extended :true}))
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, ()=>{
    console.log(port + " IS RUNNING !!!")
})

app.get('/', (req, res)=>{
    res.send('<h1>Welcome <a href="./todolist">to do list</a> </h1>')
})

app.get('/todolist', (req,res)=>{
    res.render("todo", {
        list : db.get("todo").value()
    })
})

app.get("/todolist/search",(req, res)=>{
    const value = req.query.q;
    const arrFilter = db.get('todo').value().filter(function(item){
        console.log(item.work)
        return item.work.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    res.render("todo", {
        list : arrFilter
    })
})

app.get('/todolist/create',(req,res)=>{
    res.render('create');
})

app.get("/todo/details/:id",(req,res)=>{
    const id = req.params.id;
    const todo = db.get('todo').find({id : id}).value();
    res.render('viewtodo', {
        value : todo
    })
});

app.get('/todo/:id/delete',(req,res)=>{
    res.render('delete')
})

app.post('/todo/:id/delete',(req,res)=>{
    const id = req.params.id;
    const removeIndex = db.get('todo').value().map(function(item) { return item.id; }).indexOf(id);
    db.get('todo').value().splice(removeIndex, 1);
    res.redirect("/todolist")
})

app.post('/todolist/create',(req,res)=>{
    req.body.id = shoertId.generate();
    db.get('todo').push(req.body).write();
    res.redirect("/todolist")
})
