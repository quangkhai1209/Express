let express = require('express');
let auth = express.Router();
let controller = require('../controller/auth.controller.js');
let requireAuth = require('../auth/authMiddleWare');

auth.get('/', controller.Login);
auth.post('/', controller.postLogin);
auth.get('/user/:id',requireAuth.requireAuth, controller.getPageForUser);
// auth.get('/:id/listBooks', requireAuth.requireAuth, controller.listBooks);


module.exports = auth;