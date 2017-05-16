'use strict';

const config = require('../../config.js');

// register `core` module
config.registerModule('contacts', []);

// load routes
require('./config/contacts.routes.js');

//load controllers
require('./controllers/contacts.controller.js');
//load services
require('./services/contacts.service.js');


