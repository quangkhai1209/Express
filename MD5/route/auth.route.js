let express = require('express');
let auth = express.Router(); 
let controller = require('../controller/auth.controller');
let requireAuth = require('../auth/authMiddleWare');

auth.get('/', controller.Login);
auth.post('/',controller.postLogin);
auth.get('/:id',requireAuth.requireAuth, controller.getIdPage);


module.exports = auth;