const express = require('express');
const app = express();
const users = require('./route/users.route');
const books = require('./route/books.route');
const transaction = require('./route/transaction.route');

const port = 98;

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.set('view engine', "pug");
app.set('views', "./views");

app.get('/', (req,res)=>{
    res.render('index')
})


app.use('/users', users);
app.use('/books', books);
app.use('/transaction', transaction);

app.listen(port, ()=>{
    console.log('Port ' + port + " is running !");
})
