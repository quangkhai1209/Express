const express = require('express');
const app = express();

const port = 981;

// app.set('view engine', 'pug');
app.set('views', './views');


app.get('/', (req, res)=>{
    res.send(' welcome list todo <a href="/todos"> see list to do</a> ')
})

app.get("/todos", (req, res)=>{
    res.render('todos/todo', {
        list : [
            {id : 1, todo : 'Đi chợ'},
            {id : 1, todo : 'Nấu cơm'},
            {id : 1, todo : 'Rửa bát'},
            {id : 1, todo : 'Học trên CodersX.tokyo'}
        ]
    })
})

app.listen( port, ()=>{
    console.log(port + " running");
});