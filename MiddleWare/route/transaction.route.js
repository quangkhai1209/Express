let express = require('express');
let transaction = express.Router(); 
let controller = require('../controller/transaction.controller');

transaction.get('/', controller.getIndex);
transaction.post('/new', controller.postNew);
transaction.get('/complete/:id', controller.complete);
transaction.get('/search', controller.search);

module.exports = transaction;