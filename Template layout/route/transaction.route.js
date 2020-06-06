const express = require('express');
const transaction = express.Router();
const controller = require('../controller/transaction.controller');

transaction.get('/', controller.root);

transaction.get('/create', controller.createGet)
transaction.post("/create", controller.createPost);
transaction.get("/complete/:id",controller.complete);


module.exports = transaction;