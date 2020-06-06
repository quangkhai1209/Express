const express = require('express');
const users = express.Router();
const controller = require('../controller/user.controller');


users.get('/', controller.root);

users.get('/create', controller.createGet);

users.post('/create', controller.createPost);

users.get('/edit/:id', controller.editGet);

users.post('/edit/:id', controller.editPost);

users.get('/delete/:id', controller.deleteGet);

users.post('/delete/:id', controller.deletePost);

users.get('/search', controller.search);

module.exports = users;