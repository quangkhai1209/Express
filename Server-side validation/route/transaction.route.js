const express = require('express');
const transaction = express.Router();
const controller = require('../controller/transaction.controller');

transaction.get('/', controller.root);
transaction.post('/new', controller.postNew);
transaction.get('/complete/:id', controller.complete);
transaction.get('/search', controller.search);

module.exports = transaction;