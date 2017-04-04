'use strict';

const config = require('../../config.js');

// register `core` module
config.registerModule('info', []);

// load routes
require('./config/info.routes.js');

//load controllers
require('./controllers/info.controller.js');
//load services


