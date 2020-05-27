const express = require('express');
const user = express.Router();
const db = require('../db');
const shortId = require('shortid');
const userController = require('../controller/user.controller');

user.get('/', userController.root);

user.get('/create', userController.createGet);

user.post('/create', userController.createPost);

user.get('/edit/:id', userController.editGet);

user.post('/edit/:id', userController.editPost);

user.get('/delete/:id', userController.deleteGet);

user.post("/delete/:id", userController.deletePost)

user.get('/search', userController.search);

module.exports = user;
