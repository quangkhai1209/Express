const express = require('express');
const books = express.Router();
const controller = require('../controller/books.controller');

books.get('/', controller.root);
books.get('/new', controller.getNew)
books.post('/new', controller.postNew)
books.get('/edit/:id', controller.getEdit)
books.post('/edit/:id', controller.postEdit)
books.get('/delete/:id', controller.getDelete)
books.post('/delete/:id', controller.postDelete)
books.get('/search', controller.search);

module.exports = books;