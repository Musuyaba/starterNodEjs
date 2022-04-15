const express = require('express');
const route = express.Router();

const pageController = require('../controller/pageController');

route.get('/', pageController.index);
route.get('/home', pageController.index);
route.get('/dashboard', pageController.index);
route.get('/about', pageController.about);

module.exports = route;