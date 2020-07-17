let express = require('express');
let books = express.Router(); 
let controller = require('../controller/books.controller');
let validate = require('../validate/books.validate');

books.get("/", controller.getIndex );
books.get('/createNew', controller.getCreate);
books.post('/createNew', validate.validatePostNew, controller.postCreate);
books.get("/update/:id", controller.getUpdate);
books.post('/update/:id', controller.postUpdate);
books.get("/delete/:id", controller.getDelete);
books.post("/delete/:id", controller.postDelete);
books.get('/search',validate.validateSearch, controller.search);


module.exports = books;