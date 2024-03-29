'use strict';

const config = require('../../config.js');

// register `core` module
config.registerModule('core', []);

// load routes
require('./config/core.routes.js');

//load controllers
require('./controllers/app.controller.js');
require('./controllers/header.controller.js');
require('./controllers/nav-bar.controller.js');
require('./controllers/sidebar.controller.js');
require('./controllers/footer.controller.js');
require('./controllers/top-nav.controller.js');

//load directives
require('./directives/page-select.directive.js');

//load services
require('./services/service-helper.service.js');
require('./services/footer-links.service.js');
require('./services/top-nav.service.js');
require('./services/nav-bar.service.js');





