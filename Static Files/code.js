const express = require('express');
const app = express();
const port = 98;
const books = require('./route/books.route');
const users = require('./route/users.route');
const trans = require('./route/transaction.route');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.set("view engine", 'pug');
app.set('views', './views');
app.use(express.static('Public'));

app.use('/books', books);
app.use('/users', users);
app.use('/transaction', trans);

app.get('/',(req,res)=>{
    res.render('index')
});



app.listen(port,()=>{
    console.log('Port '+ port + " is running");
})