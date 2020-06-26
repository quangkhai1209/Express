let express = require('express');
let app = express();
let users = require('./route/users.route');
let books = require('./route/books.route');
let transaction = require('./route/transaction.route');
let cookieParse = require('cookie-parser');
let count = require('./validate/count');

let port = 98;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(cookieParse());

app.get('/', count.cookiesCount,(req,res)=>{
    res.render('index')
});


app.use('/users', count.cookiesCount, count.logCount, users);
app.use('/books', count.cookiesCount, count.logCount, books);
app.use('/transaction', count.cookiesCount, count.logCount, transaction);

app.listen(port, ()=>{
    console.log("Port "+ port +" is running !!! ");
})