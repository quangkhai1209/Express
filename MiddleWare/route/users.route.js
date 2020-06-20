let express = require('express');
let users = express.Router();
let controller = require('../controller/users.controller');
let validate = require('../validate/users.validate');

users.get('/', controller.getIndex);

users.get('/createNew', controller.getCreateNew);

users.post('/createNew', validate.validatePostNew , controller.postCreateNew);

users.get('/update/:id', controller.getUpdate);

users.post('/update/:id', controller.postUpdate);

users.get('/delete/:id', controller.getDelete);

users.post('/delete/:id', controller.postDelete);

users.get('/search', controller.search);

module.exports = users;