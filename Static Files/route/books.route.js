const express= require('express');
const controller = require('../controller/books.controller');

const books = express.Router();

books.get('/', controller.root);

books.get('/create', controller.getCreate);

books.post('/create', controller.postCreate);

books.get('/edit/:id', controller.getEdit);

books.post('/edit/:id', controller.postEdit);

books.get('/:id/delete', controller.getDelete);

books.post('/:id/delete', controller.postDelete);

books.get('/search', controller.search);

module.exports = books;