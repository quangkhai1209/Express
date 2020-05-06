"use strict";

var express = require('express');

var app = express();
var port = 98;
app.set('view engine', 'pug');
app.set('views', './views');
app.get('/', function (req, res) {
  res.send(' welcome list todo <a href="/todos"> see list to do</a> ');
});
app.get("/todos", function (req, res) {
  res.render('todos/todo', {
    list: [{
      id: 1,
      todo: 'Đi chợ'
    }, {
      id: 1,
      todo: 'Nấu cơm'
    }, {
      id: 1,
      todo: 'Rửa bát'
    }, {
      id: 1,
      todo: 'Học trên CodersX.tokyo'
    }]
  });
});
app.listen(port, function () {
  console.log(port + " running");
});