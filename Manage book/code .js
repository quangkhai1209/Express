const express = require('express');
const app = express();
const port = 98;
const lowDb = require('lowdb');
const fileSync = require("lowdb/adapters/FileSync");
const adapters = new fileSync('db.json');
const db = lowDb(adapters);
const shortId = require('shortid');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'pug');
app.set('views', './views');

app.listen(port, () => {
    console.log(port + " IS RUNNING !")
});

app.get('/', (req, res) => {
    res.render('index', {
        list: db.get('book').value()
    });
});

app.get('/book/create', (req, res) => {
    res.render('fun/create')
});
app.post('/book/create', (req, res) => {
    req.body.id = shortId.generate();
    db.get('book').push(req.body).write();
    console.log(req.body)
    res.redirect("/")
});

app.get('/book/search',(req,res)=>{
    const value = req.query.q;
    const arrFilter = db.get('book').value().filter(function(item){
        return item.title.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });

    res.render("index", {
        list : arrFilter
    })
})

app.get('/book/:id/Delete', (req, res) => {
    const id = req.params.id;
    const book = db.get('book').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })
    res.render('fun/Delete', {
        value: book
    })
});

app.post('/book/:id/Delete', (req, res) => {
    const id = req.params.id;
    console.log(id)
    // db.get('todo')
    // .remove({ id: id })
    // .write()
    const removeIndex = db.get('book').value().map(function (item) { return item.id; }).indexOf(id);
    db.get('book').value().splice(removeIndex, 1);
    db.get('book').write();
    res.redirect("/");
});

app.get('/book/:id/Edit', (req, res) => {
    const id = req.params.id;
    const book = db.get('book').value().find((item) => {
        return item.id.toLowerCase().indexOf(id.toLowerCase()) !== -1;
    })

    res.render('fun/Edit', {
        value: book
    })
});

app.post('/book/:id/Edit', (req, res) => {
    db.get('book')
        .find({ id: req.params.id })
        .assign({ title: req.body.title})
        .write();
    res.redirect('/')
});
