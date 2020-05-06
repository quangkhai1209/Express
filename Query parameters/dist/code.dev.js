"use strict";

var express = require('express');

var app = express();
var port = 98;
app.set('view engine', 'pug'); // app.set('views', './views');

var data = [{
  id: 1,
  work: 'Đi chợ'
}, {
  id: 1,
  work: 'Nấu cơm'
}, {
  id: 1,
  work: 'Rửa bát'
}, {
  id: 1,
  work: 'Học tại CodersX'
}];
app.listen(port, function () {
  console.log(port + ' is running !');
});
app.get('/', function (req, res) {
  res.send('<h1> welcome <a href= "/todolist">to do list</a> </h1>');
});
app.get('/todolist', function (req, res) {
  res.render('listtodo', {
    list: data
  });
});
app.get('/todolist/search', function (req, res) {
  var q = req.query.q;
  var arrFilterQuery = data.filter(function (item) {
    return item.work.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render('listtodo', {
    list: arrFilterQuery
  });
});