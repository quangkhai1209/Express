const express = require("express");
const app = express();
const port = 98;
const books = require('./route/books.route');
const users = require('./route/users.route');
const transaction =require('./route/transaction.route');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine", 'pug');
app.set('views', './views');

app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/create',(req,res)=>{
    res.render('index')
});

app.listen(port, ()=>{
    console.log(port + " is running !!!")
})


app.use('/books', books);
app.use('/users', users);
app.use('/transaction', transaction);