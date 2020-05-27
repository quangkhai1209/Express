const express = require('express');
const transaction = express.Router();
const db = require('../db');
const shortId = require('shortid');
const transactionController = require('../controller/transaction.controller');

transaction.get('/:id',transactionController.rootGet);

transaction.post('/:id', transactionController.rootPost);

transaction.get('/:id/complete', transactionController.complete)


module.exports = transaction;