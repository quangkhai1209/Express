"use strict";

var express = require('express');

var app = express();
var port = 9080;
app.listen(port, function () {
  console.log(port + " activated");
});
app.get('/', function (req, res) {
  res.send('<a href= "/todos"> to do list </a>');
});
app.get('/todos', function (req, res) {
  res.send('<ul><li>Đi chợ</li><li>Nấu cơm</li><li>Rửa bát</li><li>Học code tại CodersX</li></ul>');
});