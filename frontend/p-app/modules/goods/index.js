'use strict';

const config = require('../../config.js');

// register `core` module
config.registerModule('goods', []);

// load routes
require('./config/goods.routes.js');

//load controllers
require('./controllers/clocks-info.controller.js');
require('./controllers/chemistry-info.controller.js');
require('./controllers/china-info.controller.js');
require('./controllers/electro-info.controller.js');
require('./controllers/glass-info.controller.js');
require('./controllers/plastic-info.controller.js');
require('./controllers/steel-info.controller.js');

require('./controllers/clocks-list.controller.js');
require('./controllers/steel-list.controller.js');
require('./controllers/plastic-list.controller.js');
require('./controllers/glass-list.controller.js');
require('./controllers/electro-list.controller.js');
require('./controllers/china-list.controller.js');
require('./controllers/chemistry-list.controller.js');

//load directives
require('./directives/goods-info-form.directive.js');
require('./directives/goods-list-form.directive.js');

//load services
require('./services/goods.service.js');
