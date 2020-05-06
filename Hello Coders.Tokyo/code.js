const express = require('express');
const app = express();

const port = 9080; 

app.listen(port, ()=>{
    console.log( port + " activated");
})

app.get('/', (req, res)=>{
    res.send('<a href= "/todos"> to do list </a>')
})

app.get('/todos', (req, res)=>{
    res.send('<ul><li>Đi chợ</li><li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>');
})