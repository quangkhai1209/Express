const express = require('express');
const book = express.Router();
const db = require('../db');
const shortID = require('shortid');
const bookController = require('../controller/book.controller');

book.get('/', bookController.root);

book.get('/add', bookController.addGet);

book.post("/add", bookController.addPost);

book.get("/edit/:id", bookController.editGet);

book.post("/edit/:id", bookController.editPost);

book.get("/delete/:id", bookController.deleteGet);

book.post("/delete/:id", bookController.deletePost);

book.get('/search', bookController.search);

module.exports = book;