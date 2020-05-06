const express = require("express");
const app = express();
const port = 9080;

app.listen(port, ()=> {
    console.log( port + ' actived !')
})
app.get('/user', (require, response)=>{
    response.send('<a href = "">this  user name</a>')
})
app.get('/', (require, response)=>{
    response.send('<a href = "https://www.facebook.com/chuongcnbhaf180208/"> link continue </a>')
})