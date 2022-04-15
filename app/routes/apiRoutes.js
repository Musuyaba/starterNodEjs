const express = require('express');
const route = express.Router();

const userController = require('../controller/userController');

route.route('/user')
.post(userController.create)
.get(userController.find);

route.route('/user/:email')
.put(userController.update)
.delete(userController.delete);

module.exports = route;