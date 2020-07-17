require('dotenv').config();
let express = require('express');
let app = express();
let users = require('./route/users.route');
let books = require('./route/books.route');
let transaction = require('./route/transaction.route');
let auth = require('./route/auth.route');
let cookieParse = require('cookie-parser');
let requireAuth = require('./auth/authMiddleWare');
const sgMail = require('@sendgrid/mail');
const { sendGridKey } = require('./config/vars');
const { Port } = require('./config/vars')

let port = Port;
sgMail.setApiKey(sendGridKey);

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParse("secret"));

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/users', requireAuth.requireAuth, requireAuth.checkPermission, users);
app.use('/books', requireAuth.requireAuth, requireAuth.checkPermission, books);
app.use('/transaction', requireAuth.requireAuth, requireAuth.checkPermission, transaction);
app.use('/auth', auth);

app.listen(port, () => {
    console.log("Port " + port + " is running !!! ");
})