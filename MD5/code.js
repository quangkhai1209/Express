let express = require('express');
let app = express();
let users = require('./route/users.route');
let books = require('./route/books.route');
let transaction = require('./route/transaction.route');
let auth = require('./route/auth.route');
let cookieParse = require('cookie-parser');
let requireAuth = require('./auth/authMiddleWare');

let port = 98;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(cookieParse("secret"));

app.get('/',(req,res)=>{
    res.render('index')
});

app.use('/users', requireAuth.requireAuth, users);
app.use('/books', requireAuth.requireAuth, books);
app.use('/transaction', requireAuth.requireAuth, transaction);
app.use('/auth', auth);

app.listen(port, ()=>{
    console.log("Port "+ port +" is running !!! ");
})