const express = require('express');
const app = express();

const port = 9080; 

app.listen(port, ()=>{
    console.log( port + " activated");
})

app.get('/', (req, res)=>{
    res.send('<a href="#"> facebook </a>');
})