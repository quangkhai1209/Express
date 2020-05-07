const express = require('express');
const app = express();
// const bodyParser = require('body-parser');
const port = 98;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const data = [
    {id : 1, work : 'Đi chợ'},
    {id : 1, work : 'Nấu cơm'},
    {id : 1, work : 'Rửa bát'},
    {id : 1, work : 'Học tại CodersX'},
];

app.listen(port, ()=>{
    console.log( port + " is running !");
});

app.get('/', (req,res)=>{
    res.send('<h1> welcome <a href="/todolist"> to do list<a/> </h1>')
});

app.get('/todolist', (req, res)=>{
    res.render('listtodo', {
        list : data,
    })
});

app.get('/todo/search', (req, res)=>{
    const value =  req.query.todo;
    const listTodoFilter = data.filter(function(item){
        return item.work.toLowerCase().indexOf(value.toLowerCase()) !== -1;
    })
    res.render('listtodo', {
        list : listTodoFilter
    })
})

app.get('/todo/create', (req,res)=>{
    res.render('create');
})
app.post('/todo/create', function(req,res){
    data.push(req.body);
    res.redirect('/todolist');
})