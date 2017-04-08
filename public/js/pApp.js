var pApp =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(19);

	angular.module(config.appName, config.dependencies);

	// Setting HTML5 Location Mode
	angular.module(config.appName).config(['$locationProvider', 'RestangularProvider', '$breadcrumbProvider', function ($locationProvider, RestangularProvider, $breadcrumbProvider) {
	  $locationProvider.hashPrefix('').html5Mode(true);

	  RestangularProvider.setRestangularFields({ id: 'id' });
	  RestangularProvider.setBaseUrl('/p-api/v1');

	  $breadcrumbProvider.setOptions({
	    templateUrl: '/views/core/breadcrumb.view.html'
	  });
	}]);

	// load `core` module
	__webpack_require__(20);
	// load `info` module
	__webpack_require__(29);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ function(module, exports) {

	'use strict';

	var appName = 'mainApp';
	var dependencies = ['restangular', 'ui.router', 'ncy-angular-breadcrumb'];

	module.exports = {
	  appName: appName,
	  dependencies: dependencies,
	  registerModule: function registerModule(moduleName, moduleDependencies) {
	    // Create angular module
	    var newModule = angular.module(moduleName, moduleDependencies || []);

	    // Add the module to the AngularJS configuration file
	    angular.module(appName).requires.push(moduleName);

	    return newModule;
	  }
		};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(19);

	// register `core` module
	config.registerModule('core', []);

	// load routes
	__webpack_require__(21);

	//load controllers
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);

	//load services
	__webpack_require__(27);
	__webpack_require__(28);

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	var run = function run($rootScope, $state, $stateParams) {
	  $rootScope.$state = $state;
	  $rootScope.$stateParams = $stateParams;
	};
	run.$inject = ['$rootScope', '$state', '$stateParams'];

	var config = function config($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise('/public/info');

	  $stateProvider.state('public', {
	    abstract: true,
	    url: '/public',
	    templateUrl: '/app-views/core/public.abstract.view.html'
	  });
	};
	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	angular.module('core').run(run).config(config);

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').controller('ApplicationController', ['$scope', function ($scope) {
	  var vm = $scope;
	}]);

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').controller('HeaderController', ['$scope', '$state', function ($scope, $state) {
	  var vm = $scope;
	}]);

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').controller('TopNavController', ['$scope', 'Restangular', function ($scope, Restangular) {
	  var vm = $scope;
	  var token = Cookies.get('token');

	  vm.user = {
	    role: '1'
	  };

	  if (token) {
	    Restangular.one('whoAmI').customPOST({ token: Cookies.get('token') }).then(function (data) {
	      if (data) {
	        if (data.success !== false) {
	          vm.user = data;
	        } else {
	          console.log('Аутентификация провалена.', data.message);
	        }
	      }
	    }).catch(function (err) {
	      console.log(err);
	    });
	  }
	}]);

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').controller('SidebarController', ['$scope', '$state', function ($scope, $state) {
	  var vm = $scope;
	  var activeItemIndex = 0;

	  vm.links = window.configData.leftSidebarItems;

	  vm.active = function (link) {
	    return $state.includes(link.url.replace('.list', '')) ? 'active' : '';
	  };
	}]);

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').controller('FooterController', ['$scope', function ($scope) {
	  var vm = $scope;
	  /*
	        FooterLinks
	          .getList(vm.query)
	          .then(links => {
	            vm.links = links
	          })
	          .catch((err) => {
	            Notification
	              .error(err.message);
	            console.log(err);
	          });
	  
	        Contacts
	          .one("")
	          .get()
	          .then((contacts) => {
	            vm.contacts = contacts;
	          })
	          .catch((err) => {
	            Notification
	              .error(err.message);
	            console.log(err);
	          });
	  
	        vm.news = {};
	        vm.query = {
	          skip: 0,
	          limit: 3,
	          orderBy: {
	            createdAt: -1
	          }
	        };
	  
	        News
	          .getList(vm.query)
	          .then(news => {
	            vm.news = news
	          })
	          .catch((err) => {
	            Notification
	              .error(err.message);
	            console.log(err);
	          });
	          */
		}]);

/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').factory('ServiceHelper', ['Restangular', function (Restangular) {
	  this.createRestfulResource = function (route, fields, defaults) {
	    var restResource = Restangular.all(route);
	    restResource.fields = fields;
	    restResource.defaults = defaults;
	    restResource.restangularizeElement = function (parent, element, queryParams) {
	      Restangular.restangularizeElement(parent, element, route, queryParams);
	    };
	    restResource.restangularizeCollection = function (parent, element, queryParams) {
	      Restangular.restangularizeCollection(parent, element, route, queryParams);
	    };
	    return restResource;
	  };

	  return this;
	}]);

/***/ },
/* 28 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').factory('FooterLinks', ['Restangular', 'ServiceHelper', function (Restangular, ServiceHelper) {
	  var route = 'footer-links',
	      fields = [{ name: 'link' }, { name: 'text' }, { name: 'position' }];

	  return ServiceHelper.createRestfulResource(route, fields);
	}]);

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(19);

	// register `core` module
	config.registerModule('info', []);

	// load routes
	__webpack_require__(30);

	//load controllers
	__webpack_require__(31);
	//load services

/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	var run = function run($rootScope, $state, $stateParams) {
	  $rootScope.$state = $state;
	  $rootScope.$stateParams = $stateParams;
	};
	run.$inject = ['$rootScope', '$state', '$stateParams'];

	var config = function config($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('public.info', {
	    abstract: true,
	    url: '/info',
	    templateUrl: '/app-views/info/info.abstract.view.html'
	  }).state('public.info.main', {
	    url: '',
	    templateUrl: '/app-views/info/info.view.html',
	    controller: 'InfoController',
	    ncyBreadcrumb: {
	      label: ""
	    }
	  });
	};
	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	angular.module('info').run(run).config(config);

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	angular.module('info').controller('InfoController', ['$scope', function ($scope) {
	  var vm = $scope;
	}]);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicEFwcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1M2Q4YzJmYTNjYjZhMzAxOTlkMD9mNzdjIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvcC1hcHAvY29uZmlnLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9jb25maWcvY29yZS5yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9jb250cm9sbGVycy9hcHAuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2hlYWRlci5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvdG9wLW5hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvc2lkZWJhci5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvZm9vdGVyLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9zZXJ2aWNlcy9zZXJ2aWNlLWhlbHBlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvc2VydmljZXMvZm9vdGVyLWxpbmtzLnNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3AtYXBwL21vZHVsZXMvaW5mby9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9pbmZvL2NvbmZpZy9pbmZvLnJvdXRlcy5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9pbmZvL2NvbnRyb2xsZXJzL2luZm8uY29udHJvbGxlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA1M2Q4YzJmYTNjYjZhMzAxOTlkMCIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgY29uZmlnID0gcmVxdWlyZSgnLi9jb25maWcuanMnKTtcblxuYW5ndWxhci5tb2R1bGUoY29uZmlnLmFwcE5hbWUsIGNvbmZpZy5kZXBlbmRlbmNpZXMpO1xuXG4vLyBTZXR0aW5nIEhUTUw1IExvY2F0aW9uIE1vZGVcbmFuZ3VsYXIubW9kdWxlKGNvbmZpZy5hcHBOYW1lKS5jb25maWcoWyckbG9jYXRpb25Qcm92aWRlcicsICdSZXN0YW5ndWxhclByb3ZpZGVyJywgJyRicmVhZGNydW1iUHJvdmlkZXInLFxuICAoJGxvY2F0aW9uUHJvdmlkZXIsIFJlc3Rhbmd1bGFyUHJvdmlkZXIsICRicmVhZGNydW1iUHJvdmlkZXIpID0+IHtcbiAgICAkbG9jYXRpb25Qcm92aWRlclxuICAgICAgLmhhc2hQcmVmaXgoJycpXG4gICAgICAuaHRtbDVNb2RlKHRydWUpO1xuXG4gICAgUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRSZXN0YW5ndWxhckZpZWxkcyh7IGlkOiAnaWQnIH0pO1xuICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0QmFzZVVybCgnL3AtYXBpL3YxJyk7XG5cbiAgICAkYnJlYWRjcnVtYlByb3ZpZGVyLnNldE9wdGlvbnMoe1xuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvY29yZS9icmVhZGNydW1iLnZpZXcuaHRtbCdcbiAgICB9KTtcbiAgfVxuXSk7XG5cbi8vIGxvYWQgYGNvcmVgIG1vZHVsZVxucmVxdWlyZSgnLi9tb2R1bGVzL2NvcmUvaW5kZXguanMnKTtcbi8vIGxvYWQgYGluZm9gIG1vZHVsZVxucmVxdWlyZSgnLi9tb2R1bGVzL2luZm8vaW5kZXguanMnKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9wLWFwcC9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBwTmFtZSA9ICdtYWluQXBwJztcbmNvbnN0IGRlcGVuZGVuY2llcyA9IFtcbiAgJ3Jlc3Rhbmd1bGFyJyxcbiAgJ3VpLnJvdXRlcicsXG4gICduY3ktYW5ndWxhci1icmVhZGNydW1iJ1xuXTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFwcE5hbWUsXG4gIGRlcGVuZGVuY2llcyxcbiAgcmVnaXN0ZXJNb2R1bGUgKG1vZHVsZU5hbWUsIG1vZHVsZURlcGVuZGVuY2llcykge1xuICAgIC8vIENyZWF0ZSBhbmd1bGFyIG1vZHVsZVxuICAgIGNvbnN0IG5ld01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG1vZHVsZU5hbWUsIG1vZHVsZURlcGVuZGVuY2llcyB8fCBbXSk7XG5cbiAgICAvLyBBZGQgdGhlIG1vZHVsZSB0byB0aGUgQW5ndWxhckpTIGNvbmZpZ3VyYXRpb24gZmlsZVxuICAgIGFuZ3VsYXIubW9kdWxlKGFwcE5hbWUpLnJlcXVpcmVzLnB1c2gobW9kdWxlTmFtZSk7XG5cbiAgICByZXR1cm4gbmV3TW9kdWxlO1xuICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9wLWFwcC9jb25maWcuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy5qcycpO1xuXG4vLyByZWdpc3RlciBgY29yZWAgbW9kdWxlXG5jb25maWcucmVnaXN0ZXJNb2R1bGUoJ2NvcmUnLCBbXSk7XG5cbi8vIGxvYWQgcm91dGVzXG5yZXF1aXJlKCcuL2NvbmZpZy9jb3JlLnJvdXRlcy5qcycpO1xuXG4vL2xvYWQgY29udHJvbGxlcnNcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMvYXBwLmNvbnRyb2xsZXIuanMnKTtcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMvaGVhZGVyLmNvbnRyb2xsZXIuanMnKTtcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMvdG9wLW5hdi5jb250cm9sbGVyLmpzJyk7XG5yZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3NpZGViYXIuY29udHJvbGxlci5qcycpO1xucmVxdWlyZSgnLi9jb250cm9sbGVycy9mb290ZXIuY29udHJvbGxlci5qcycpO1xuXG4vL2xvYWQgc2VydmljZXNcbnJlcXVpcmUoJy4vc2VydmljZXMvc2VydmljZS1oZWxwZXIuc2VydmljZS5qcycpO1xucmVxdWlyZSgnLi9zZXJ2aWNlcy9mb290ZXItbGlua3Muc2VydmljZS5qcycpO1xuXG5cblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgcnVuID0gKCRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zKSA9PiB7XG4gICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbn07XG5ydW4uJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJ107XG5cbmxldCBjb25maWcgPSAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuICAkdXJsUm91dGVyUHJvdmlkZXJcbiAgICAub3RoZXJ3aXNlKCcvcHVibGljL2luZm8nKTtcblxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgncHVibGljJywge1xuICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICB1cmw6ICcvcHVibGljJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC12aWV3cy9jb3JlL3B1YmxpYy5hYnN0cmFjdC52aWV3Lmh0bWwnXG4gICAgfSk7XG59O1xuY29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ2NvcmUnKVxuICAucnVuKHJ1bilcbiAgLmNvbmZpZyhjb25maWcpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvY29uZmlnL2NvcmUucm91dGVzLmpzIiwiYW5ndWxhclxuICAubW9kdWxlKCdjb3JlJylcbiAgLmNvbnRyb2xsZXIoJ0FwcGxpY2F0aW9uQ29udHJvbGxlcicsIFsnJHNjb3BlJywgKCRzY29wZSkgPT4ge1xuICAgIGxldCB2bSA9ICRzY29wZTtcbiAgfV0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvYXBwLmNvbnRyb2xsZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnY29yZScpXG4gIC5jb250cm9sbGVyKCdIZWFkZXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlJywgKCRzY29wZSwgJHN0YXRlKSA9PiB7XG4gICAgbGV0IHZtID0gJHNjb3BlO1xuICB9XSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuICAubW9kdWxlKCdjb3JlJylcbiAgLmNvbnRyb2xsZXIoJ1RvcE5hdkNvbnRyb2xsZXInLCBbJyRzY29wZScsICdSZXN0YW5ndWxhcicsICgkc2NvcGUsIFJlc3Rhbmd1bGFyKSA9PiB7XG4gICAgY29uc3Qgdm0gPSAkc2NvcGU7XG4gICAgY29uc3QgdG9rZW4gPSBDb29raWVzLmdldCgndG9rZW4nKTtcblxuICAgIHZtLnVzZXIgPSB7XG4gICAgICByb2xlOiAnMSdcbiAgICB9O1xuXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBSZXN0YW5ndWxhclxuICAgICAgICAub25lKGB3aG9BbUlgKVxuICAgICAgICAuY3VzdG9tUE9TVCh7IHRva2VuOiBDb29raWVzLmdldCgndG9rZW4nKSB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICB2bS51c2VyID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQkNGD0YLQtdC90YLQuNGE0LjQutCw0YbQuNGPINC/0YDQvtCy0LDQu9C10L3QsC4nLCBkYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL3RvcC1uYXYuY29udHJvbGxlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuICAubW9kdWxlKCdjb3JlJylcbiAgLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlJywgKCRzY29wZSwgJHN0YXRlKSA9PiB7XG4gICAgbGV0IHZtID0gJHNjb3BlO1xuICAgIGxldCBhY3RpdmVJdGVtSW5kZXggPSAwO1xuXG4gICAgdm0ubGlua3MgPSB3aW5kb3cuY29uZmlnRGF0YS5sZWZ0U2lkZWJhckl0ZW1zO1xuXG4gICAgdm0uYWN0aXZlID0gKGxpbmspID0+IHtcbiAgICAgIHJldHVybiAkc3RhdGUuaW5jbHVkZXMobGluay51cmwucmVwbGFjZSgnLmxpc3QnLCAnJykpID8gJ2FjdGl2ZScgOiAnJztcbiAgICB9O1xuICB9XSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9jb250cm9sbGVycy9zaWRlYmFyLmNvbnRyb2xsZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnY29yZScpXG4gIC5jb250cm9sbGVyKCdGb290ZXJDb250cm9sbGVyJywgWyckc2NvcGUnLFxuICAgICgkc2NvcGUpID0+IHtcbiAgICAgIGxldCB2bSA9ICRzY29wZTtcbi8qXG4gICAgICBGb290ZXJMaW5rc1xuICAgICAgICAuZ2V0TGlzdCh2bS5xdWVyeSlcbiAgICAgICAgLnRoZW4obGlua3MgPT4ge1xuICAgICAgICAgIHZtLmxpbmtzID0gbGlua3NcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBOb3RpZmljYXRpb25cbiAgICAgICAgICAgIC5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIENvbnRhY3RzXG4gICAgICAgIC5vbmUoXCJcIilcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC50aGVuKChjb250YWN0cykgPT4ge1xuICAgICAgICAgIHZtLmNvbnRhY3RzID0gY29udGFjdHM7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgTm90aWZpY2F0aW9uXG4gICAgICAgICAgICAuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuXG4gICAgICB2bS5uZXdzID0ge307XG4gICAgICB2bS5xdWVyeSA9IHtcbiAgICAgICAgc2tpcDogMCxcbiAgICAgICAgbGltaXQ6IDMsXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6IC0xXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIE5ld3NcbiAgICAgICAgLmdldExpc3Qodm0ucXVlcnkpXG4gICAgICAgIC50aGVuKG5ld3MgPT4ge1xuICAgICAgICAgIHZtLm5ld3MgPSBuZXdzXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgTm90aWZpY2F0aW9uXG4gICAgICAgICAgICAuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgIH1dKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2Zvb3Rlci5jb250cm9sbGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29yZScpLmZhY3RvcnkoJ1NlcnZpY2VIZWxwZXInLCBbJ1Jlc3Rhbmd1bGFyJyxcbiAgZnVuY3Rpb24gKFJlc3Rhbmd1bGFyKSB7XG4gICAgdGhpcy5jcmVhdGVSZXN0ZnVsUmVzb3VyY2UgPSAocm91dGUsIGZpZWxkcywgZGVmYXVsdHMpID0+IHtcbiAgICAgIHZhciByZXN0UmVzb3VyY2UgPSBSZXN0YW5ndWxhci5hbGwocm91dGUpO1xuICAgICAgcmVzdFJlc291cmNlLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgIHJlc3RSZXNvdXJjZS5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgICAgcmVzdFJlc291cmNlLnJlc3Rhbmd1bGFyaXplRWxlbWVudCA9IChwYXJlbnQsIGVsZW1lbnQsIHF1ZXJ5UGFyYW1zKSA9PiB7XG4gICAgICAgIFJlc3Rhbmd1bGFyLnJlc3Rhbmd1bGFyaXplRWxlbWVudChwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBxdWVyeVBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgcmVzdFJlc291cmNlLnJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbiA9IChwYXJlbnQsIGVsZW1lbnQsIHF1ZXJ5UGFyYW1zKSA9PiB7XG4gICAgICAgIFJlc3Rhbmd1bGFyLnJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBxdWVyeVBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3RSZXNvdXJjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbl0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9zZXJ2aWNlcy9zZXJ2aWNlLWhlbHBlci5zZXJ2aWNlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29yZScpXG4gIC5mYWN0b3J5KCdGb290ZXJMaW5rcycsIFsnUmVzdGFuZ3VsYXInLCAnU2VydmljZUhlbHBlcicsIGZ1bmN0aW9uIChSZXN0YW5ndWxhciwgU2VydmljZUhlbHBlcikge1xuICAgIHZhciByb3V0ZSA9ICdmb290ZXItbGlua3MnLFxuICAgICAgZmllbGRzID0gW1xuICAgICAgICB7IG5hbWU6ICdsaW5rJyB9LFxuICAgICAgICB7IG5hbWU6ICd0ZXh0JyB9LFxuICAgICAgICB7IG5hbWU6ICdwb3NpdGlvbicgfVxuICAgICAgXTtcblxuICAgIHJldHVybiBTZXJ2aWNlSGVscGVyLmNyZWF0ZVJlc3RmdWxSZXNvdXJjZShyb3V0ZSwgZmllbGRzKTtcbiAgfV0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvc2VydmljZXMvZm9vdGVyLWxpbmtzLnNlcnZpY2UuanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4uLy4uL2NvbmZpZy5qcycpO1xuXG4vLyByZWdpc3RlciBgY29yZWAgbW9kdWxlXG5jb25maWcucmVnaXN0ZXJNb2R1bGUoJ2luZm8nLCBbXSk7XG5cbi8vIGxvYWQgcm91dGVzXG5yZXF1aXJlKCcuL2NvbmZpZy9pbmZvLnJvdXRlcy5qcycpO1xuXG4vL2xvYWQgY29udHJvbGxlcnNcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMvaW5mby5jb250cm9sbGVyLmpzJyk7XG4vL2xvYWQgc2VydmljZXNcblxuXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9pbmZvL2luZGV4LmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgcnVuID0gKCRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zKSA9PiB7XG4gICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xuICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcbn07XG5ydW4uJGluamVjdCA9IFsnJHJvb3RTY29wZScsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJ107XG5cbmxldCBjb25maWcgPSAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgncHVibGljLmluZm8nLCB7XG4gICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgIHVybDogJy9pbmZvJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC12aWV3cy9pbmZvL2luZm8uYWJzdHJhY3Qudmlldy5odG1sJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdwdWJsaWMuaW5mby5tYWluJywge1xuICAgICAgdXJsOiAnJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAnL2FwcC12aWV3cy9pbmZvL2luZm8udmlldy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdJbmZvQ29udHJvbGxlcicsXG4gICAgICBuY3lCcmVhZGNydW1iOiB7XG4gICAgICAgIGxhYmVsOiBcIlwiXG4gICAgICB9XG4gICAgfSk7XG59O1xuY29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ2luZm8nKVxuICAucnVuKHJ1bilcbiAgLmNvbmZpZyhjb25maWcpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9wLWFwcC9tb2R1bGVzL2luZm8vY29uZmlnL2luZm8ucm91dGVzLmpzIiwiYW5ndWxhclxuICAubW9kdWxlKCdpbmZvJylcbiAgLmNvbnRyb2xsZXIoJ0luZm9Db250cm9sbGVyJywgWyckc2NvcGUnLCAoJHNjb3BlKSA9PiB7XG4gICAgbGV0IHZtID0gJHNjb3BlO1xuICB9XSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3AtYXBwL21vZHVsZXMvaW5mby9jb250cm9sbGVycy9pbmZvLmNvbnRyb2xsZXIuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWEE7Ozs7OztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDcEJBO0FBR0E7Ozs7Ozs7QUNIQTtBQUNBO0FBQ0E7QUFHQTs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNENBOzs7Ozs7QUNuREE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFFQTtBQUFBO0FBQ0E7QUFNQTs7Ozs7OztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUhBO0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBSkE7QUFRQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3pCQTtBQUdBOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==