let express = require('express');
let app = express();
let users = require('./route/users.route');
let books = require('./route/books.route');
let transaction = require('./route/transaction.route');

let port = 98;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index')
});

app.use('/users', users);
app.use('/books', books);
app.use('/transaction', transaction);

app.listen(port, ()=>{
    console.log("Port "+ port +" is running !!! ");
})