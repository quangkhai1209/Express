const express = require('express');
const app = express();
const port = 98;
const book = require('./route/book.route');
const user = require('./route/user.route');
const transaction = require('./route/transaction.route');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set('view engine', 'pug');
app.set('views', './views');

app.listen( port , function(){
    console.log(port + " is running !")
})

app.get('/', function(req,res){
    res.render('index');
})



app.use('/transaction', transaction)
app.use('/user', user);
app.use('/book', book);