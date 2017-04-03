'use strict';

const config = require('./config.js');

angular.module(config.appName, config.dependencies);

// Setting HTML5 Location Mode
angular.module(config.appName).config(['$locationProvider', 'RestangularProvider', '$breadcrumbProvider',
  ($locationProvider, RestangularProvider, $breadcrumbProvider) => {
    $locationProvider
      .hashPrefix('')
      .html5Mode(true);

    RestangularProvider.setRestangularFields({ id: 'id' });
    RestangularProvider.setBaseUrl('/p-api/v1');

    $breadcrumbProvider.setOptions({
      templateUrl: '/views/core/breadcrumb.view.html'
    });
  }
]);

// load `core` module
require('./modules/core/index.js');
