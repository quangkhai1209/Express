const express = require('express');
const books = express.Router();
const controller = require('../controller/book.controller');

books.get('/', controller.root);
books.get('/create', controller.creatGet);
books.post('/create', controller.createPost);

books.get("/edit/:id", controller.editGet);

books.post("/edit/:id",  controller.editPost);

books.get("/delete/:id", controller.deleteGet);

books.post("/delete/:id", controller.deletePost);

books.get('/search', controller.search)

module.exports = books;