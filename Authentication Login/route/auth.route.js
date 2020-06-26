let express = require('express');
let auth = express.Router(); 
let controller = require('../controller/auth.controller');
let validate = require('../validate/books.validate');

auth.get('/', controller.Login);
auth.post('/',controller.postLogin);
auth.get('/:id', controller.getIdPage);


module.exports = auth;