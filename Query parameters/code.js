const express = require('express');
const app = express();
const port = 98;

app.set('view engine', 'pug');
// app.set('views', './views');

const data = [
    {id : 1, work : 'Đi chợ'},
    {id : 1, work : 'Nấu cơm'},
    {id : 1, work : 'Rửa bát'},
    {id : 1, work : 'Học tại CodersX'},
]

app.listen(port, ()=>{
    console.log(port + ' is running !');
});

app.get('/', (req, res)=>{
    res.send('<h1> welcome <a href= "/todolist">to do list</a> </h1>')
});

app.get('/todolist', (req, res)=>{
    res.render('listtodo', {
        list : data
    });
});
app.get('/todolist/search', (req,res)=>{
    const q = req.query.q;
    const arrFilterQuery = data.filter(function(item){
        return item.work.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('listtodo', {
        list : arrFilterQuery
    });
})
