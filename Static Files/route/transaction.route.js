const express = require('express');
const trans = express.Router();
const controller = require('../controller/transaction.controller');

trans.get('/', controller.root);

trans.get('/newTrans', controller.getNew);

trans.post('/newTrans', controller.postNew);

trans.get('/complete/:id', controller.complete);

trans.get('/search', controller.search);

module.exports=trans;