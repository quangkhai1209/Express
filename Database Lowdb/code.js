const express = require('express');
const app = express();
const port = 98;
app.set('view engine', "pug");
app.set('views', './views');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ data: [] })
  .write()

app.listen(port, ()=>{
    console.log(port + ' is running !');
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get('/', (req,res)=>{
    res.send('<h1> welcome <a href="/todolist">to do list</a></h1>');
});
app.get('/todolist', (req,res)=>{
    res.render('todolist', {
        list : db.get('data').value(),
    })
});

app.get('/todo/search',(req,res)=>{
    const value = req.query.q;
    const arrFilterData = db.get('data').value().filter(function(item){
        return item.work.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
    res.render("todolist", {
        list : arrFilterData
    }
)});

app.get('/create', (req,res)=>{
    res.render("create");
});

app.post("/create", (req,res)=>{
    db.get('data').push(req.body).write();
    res.redirect('./todolist')
});