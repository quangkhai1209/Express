const express = require("express");
const books = express.Router();
var multer = require("multer");
var upload = multer({ dest: "./public/uploads/" });
const booksController = require("../controller/books.controller");

books.get("/addBooks", booksController.getAddBooksPage);

books.post("/addBooks", upload.single("images"), booksController.validatePostNewBooks, booksController.postAddBooksPage);

books.get("/viewBooks", booksController.getViewBooks);

books.get("/viewBooks/edit/:id",  booksController.getEditBook);

books.post("/viewBooks/edit/:id", upload.single("images"),  booksController.postEditBook);

books.get("/viewBooks/delete/:id",  booksController.getDeleteBook);

books.post("/viewBooks/delete/:id", booksController.postDeleteBook);

module.exports = books;