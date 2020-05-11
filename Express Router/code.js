const express = require('express');
const port = 98;
const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');
const transactionRoute = require('./routes/transaction.route');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => {
    console.log(port + " IS RUNNING !")
});

app.get('/',(req,res)=>{
    res.render('index');
})

app.use('/admin',bookRoute);

app.use('/user', userRoute);

app.use('/transaction',transactionRoute);
