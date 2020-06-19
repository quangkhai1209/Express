const express =require('express');
const users = express.Router();
const controller = require('../controller/users.controller');

users.get('/', controller.root);
users.get('/new', controller.getNew);
users.post('/new', controller.postNew);
users.get('/edit/:id', controller.getEdit);
users.post('/edit/:id', controller.postEdit);
users.get('/delete/:id', controller.getDelete);
users.post('/delete/:id', controller.postDelete);
users.get('/search',controller.search);

module.exports = users;