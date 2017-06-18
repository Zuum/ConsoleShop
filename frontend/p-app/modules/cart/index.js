'use strict';

const config = require('../../config.js');

// register `core` module
config.registerModule('cart', []);

// load routes
require('./config/cart.routes.js');

//load controllers
require('./controllers/cart.controller.js');

//load directives
require('./directives/cart.directive.js');

//load services
require('./services/cart.service.js');
