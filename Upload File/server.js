require('dotenv').config();
const express = require('express');
const app = express();
const cookieParse = require('cookie-parser');
const sgMail = require('@sendgrid/mail');
const { sendGridKey } = require('./config/vars');
const { Port } = require('./config/vars');
const authMiddleWare = require('./auth/authMiddleWare');


const users = require('./route/user.route');
const books = require('./route/book.route');
const auth = require('./route/auth.route');


const port = Port;
sgMail.setApiKey(sendGridKey);

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParse("secret"));

app.get('/', (req, res) => {
    res.redirect('/admin/manage')
});
app.get('/admin/manage', authMiddleWare.requireAuth, (req, res) => {
    res.render('index')
});

app.use('/admin/manage/users', authMiddleWare.requireAuth , users);
app.use('/admin/manage/books', authMiddleWare.requireAuth, books);
app.use('/auth', auth);

app.listen(port, () => {
    console.log('Server listening on port ' + port);
});