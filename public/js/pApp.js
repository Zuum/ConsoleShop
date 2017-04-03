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

	var config = __webpack_require__(18);

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
	__webpack_require__(19);

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
/* 18 */
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var config = __webpack_require__(18);

	// register `core` module
	config.registerModule('core', []);

	// load routes
	__webpack_require__(20);

	//load controllers
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);

	//load services
	__webpack_require__(26);
	__webpack_require__(27);

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	var run = function run($rootScope, $state, $stateParams) {
	  $rootScope.$state = $state;
	  $rootScope.$stateParams = $stateParams;
	};
	run.$inject = ['$rootScope', '$state', '$stateParams'];

	var config = function config($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise('/public');

	  $stateProvider.state('public', {
	    abstract: true,
	    url: '/public',
	    templateUrl: '/views/core/public.abstract.view.html'
	  });
	};
	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	angular.module('core').run(run).config(config);

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').controller('ApplicationController', ['$scope', function ($scope) {
	  var vm = $scope;
	}]);

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').controller('HeaderController', ['$scope', '$state', function ($scope, $state) {
	  var vm = $scope;

	  vm.links = window.configData.headerItems;
	  vm.active = function (link) {
	    return $state.includes(link.url.replace('.main', '')) ? 'active' : '';
	  };
	}]);

/***/ },
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ function(module, exports) {

	'use strict';

	angular.module('core').factory('FooterLinks', ['Restangular', 'ServiceHelper', function (Restangular, ServiceHelper) {
	  var route = 'footer-links',
	      fields = [{ name: 'link' }, { name: 'text' }, { name: 'position' }];

	  return ServiceHelper.createRestfulResource(route, fields);
	}]);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicEFwcC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAzMTA1NWM5NDM5NDg2ZTE4OGE4Nj8zMTUzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvcC1hcHAvY29uZmlnLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9jb25maWcvY29yZS5yb3V0ZXMuanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9jb250cm9sbGVycy9hcHAuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2hlYWRlci5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvdG9wLW5hdi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvc2lkZWJhci5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvY29udHJvbGxlcnMvZm9vdGVyLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vL2Zyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9zZXJ2aWNlcy9zZXJ2aWNlLWhlbHBlci5zZXJ2aWNlLmpzIiwid2VicGFjazovLy9mcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvc2VydmljZXMvZm9vdGVyLWxpbmtzLnNlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzEwNTVjOTQzOTQ4NmUxODhhODYiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNvbmZpZyA9IHJlcXVpcmUoJy4vY29uZmlnLmpzJyk7XG5cbmFuZ3VsYXIubW9kdWxlKGNvbmZpZy5hcHBOYW1lLCBjb25maWcuZGVwZW5kZW5jaWVzKTtcblxuLy8gU2V0dGluZyBIVE1MNSBMb2NhdGlvbiBNb2RlXG5hbmd1bGFyLm1vZHVsZShjb25maWcuYXBwTmFtZSkuY29uZmlnKFsnJGxvY2F0aW9uUHJvdmlkZXInLCAnUmVzdGFuZ3VsYXJQcm92aWRlcicsICckYnJlYWRjcnVtYlByb3ZpZGVyJyxcbiAgKCRsb2NhdGlvblByb3ZpZGVyLCBSZXN0YW5ndWxhclByb3ZpZGVyLCAkYnJlYWRjcnVtYlByb3ZpZGVyKSA9PiB7XG4gICAgJGxvY2F0aW9uUHJvdmlkZXJcbiAgICAgIC5oYXNoUHJlZml4KCcnKVxuICAgICAgLmh0bWw1TW9kZSh0cnVlKTtcblxuICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0UmVzdGFuZ3VsYXJGaWVsZHMoeyBpZDogJ2lkJyB9KTtcbiAgICBSZXN0YW5ndWxhclByb3ZpZGVyLnNldEJhc2VVcmwoJy9wLWFwaS92MScpO1xuXG4gICAgJGJyZWFkY3J1bWJQcm92aWRlci5zZXRPcHRpb25zKHtcbiAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2NvcmUvYnJlYWRjcnVtYi52aWV3Lmh0bWwnXG4gICAgfSk7XG4gIH1cbl0pO1xuXG4vLyBsb2FkIGBjb3JlYCBtb2R1bGVcbnJlcXVpcmUoJy4vbW9kdWxlcy9jb3JlL2luZGV4LmpzJyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvaW5kZXguanMiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFwcE5hbWUgPSAnbWFpbkFwcCc7XG5jb25zdCBkZXBlbmRlbmNpZXMgPSBbXG4gICdyZXN0YW5ndWxhcicsXG4gICd1aS5yb3V0ZXInLFxuICAnbmN5LWFuZ3VsYXItYnJlYWRjcnVtYidcbl07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhcHBOYW1lLFxuICBkZXBlbmRlbmNpZXMsXG4gIHJlZ2lzdGVyTW9kdWxlIChtb2R1bGVOYW1lLCBtb2R1bGVEZXBlbmRlbmNpZXMpIHtcbiAgICAvLyBDcmVhdGUgYW5ndWxhciBtb2R1bGVcbiAgICBjb25zdCBuZXdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShtb2R1bGVOYW1lLCBtb2R1bGVEZXBlbmRlbmNpZXMgfHwgW10pO1xuXG4gICAgLy8gQWRkIHRoZSBtb2R1bGUgdG8gdGhlIEFuZ3VsYXJKUyBjb25maWd1cmF0aW9uIGZpbGVcbiAgICBhbmd1bGFyLm1vZHVsZShhcHBOYW1lKS5yZXF1aXJlcy5wdXNoKG1vZHVsZU5hbWUpO1xuXG4gICAgcmV0dXJuIG5ld01vZHVsZTtcbiAgfVxufTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvY29uZmlnLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjb25maWcgPSByZXF1aXJlKCcuLi8uLi9jb25maWcuanMnKTtcblxuLy8gcmVnaXN0ZXIgYGNvcmVgIG1vZHVsZVxuY29uZmlnLnJlZ2lzdGVyTW9kdWxlKCdjb3JlJywgW10pO1xuXG4vLyBsb2FkIHJvdXRlc1xucmVxdWlyZSgnLi9jb25maWcvY29yZS5yb3V0ZXMuanMnKTtcblxuLy9sb2FkIGNvbnRyb2xsZXJzXG5yZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2FwcC5jb250cm9sbGVyLmpzJyk7XG5yZXF1aXJlKCcuL2NvbnRyb2xsZXJzL2hlYWRlci5jb250cm9sbGVyLmpzJyk7XG5yZXF1aXJlKCcuL2NvbnRyb2xsZXJzL3RvcC1uYXYuY29udHJvbGxlci5qcycpO1xucmVxdWlyZSgnLi9jb250cm9sbGVycy9zaWRlYmFyLmNvbnRyb2xsZXIuanMnKTtcbnJlcXVpcmUoJy4vY29udHJvbGxlcnMvZm9vdGVyLmNvbnRyb2xsZXIuanMnKTtcblxuLy9sb2FkIHNlcnZpY2VzXG5yZXF1aXJlKCcuL3NlcnZpY2VzL3NlcnZpY2UtaGVscGVyLnNlcnZpY2UuanMnKTtcbnJlcXVpcmUoJy4vc2VydmljZXMvZm9vdGVyLWxpbmtzLnNlcnZpY2UuanMnKTtcblxuXG5cblxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9pbmRleC5qcyIsIid1c2Ugc3RyaWN0JztcblxubGV0IHJ1biA9ICgkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcykgPT4ge1xuICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcbiAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XG59O1xucnVuLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcyddO1xuXG5sZXQgY29uZmlnID0gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcbiAgJHVybFJvdXRlclByb3ZpZGVyXG4gICAgLm90aGVyd2lzZSgnL3B1YmxpYycpO1xuXG4gICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdwdWJsaWMnLCB7XG4gICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgIHVybDogJy9wdWJsaWMnLFxuICAgICAgdGVtcGxhdGVVcmw6ICcvdmlld3MvY29yZS9wdWJsaWMuYWJzdHJhY3Qudmlldy5odG1sJ1xuICAgIH0pO1xufTtcbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcblxuYW5ndWxhclxuICAubW9kdWxlKCdjb3JlJylcbiAgLnJ1bihydW4pXG4gIC5jb25maWcoY29uZmlnKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2NvbmZpZy9jb3JlLnJvdXRlcy5qcyIsImFuZ3VsYXJcbiAgLm1vZHVsZSgnY29yZScpXG4gIC5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkNvbnRyb2xsZXInLCBbJyRzY29wZScsICgkc2NvcGUpID0+IHtcbiAgICBsZXQgdm0gPSAkc2NvcGU7XG4gIH1dKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2FwcC5jb250cm9sbGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4gIC5tb2R1bGUoJ2NvcmUnKVxuICAuY29udHJvbGxlcignSGVhZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZScsICgkc2NvcGUsICRzdGF0ZSkgPT4ge1xuICAgIGxldCB2bSA9ICRzY29wZTtcblxuICAgIHZtLmxpbmtzID0gd2luZG93LmNvbmZpZ0RhdGEuaGVhZGVySXRlbXM7XG4gICAgdm0uYWN0aXZlID0gKGxpbmspID0+IHtcbiAgICAgIHJldHVybiAkc3RhdGUuaW5jbHVkZXMobGluay51cmwucmVwbGFjZSgnLm1haW4nLCAnJykpID8gJ2FjdGl2ZScgOiAnJztcbiAgICB9O1xuICB9XSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9jb250cm9sbGVycy9oZWFkZXIuY29udHJvbGxlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuICAubW9kdWxlKCdjb3JlJylcbiAgLmNvbnRyb2xsZXIoJ1RvcE5hdkNvbnRyb2xsZXInLCBbJyRzY29wZScsICdSZXN0YW5ndWxhcicsICgkc2NvcGUsIFJlc3Rhbmd1bGFyKSA9PiB7XG4gICAgY29uc3Qgdm0gPSAkc2NvcGU7XG4gICAgY29uc3QgdG9rZW4gPSBDb29raWVzLmdldCgndG9rZW4nKTtcblxuICAgIHZtLnVzZXIgPSB7XG4gICAgICByb2xlOiAnMSdcbiAgICB9O1xuXG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBSZXN0YW5ndWxhclxuICAgICAgICAub25lKGB3aG9BbUlgKVxuICAgICAgICAuY3VzdG9tUE9TVCh7IHRva2VuOiBDb29raWVzLmdldCgndG9rZW4nKSB9KVxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICB2bS51c2VyID0gZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfQkNGD0YLQtdC90YLQuNGE0LjQutCw0YbQuNGPINC/0YDQvtCy0LDQu9C10L3QsC4nLCBkYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL3RvcC1uYXYuY29udHJvbGxlci5qcyIsIid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuICAubW9kdWxlKCdjb3JlJylcbiAgLmNvbnRyb2xsZXIoJ1NpZGViYXJDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlJywgKCRzY29wZSwgJHN0YXRlKSA9PiB7XG4gICAgbGV0IHZtID0gJHNjb3BlO1xuICAgIGxldCBhY3RpdmVJdGVtSW5kZXggPSAwO1xuXG4gICAgdm0ubGlua3MgPSB3aW5kb3cuY29uZmlnRGF0YS5sZWZ0U2lkZWJhckl0ZW1zO1xuXG4gICAgdm0uYWN0aXZlID0gKGxpbmspID0+IHtcbiAgICAgIHJldHVybiAkc3RhdGUuaW5jbHVkZXMobGluay51cmwucmVwbGFjZSgnLmxpc3QnLCAnJykpID8gJ2FjdGl2ZScgOiAnJztcbiAgICB9O1xuICB9XSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9jb250cm9sbGVycy9zaWRlYmFyLmNvbnRyb2xsZXIuanMiLCIndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbiAgLm1vZHVsZSgnY29yZScpXG4gIC5jb250cm9sbGVyKCdGb290ZXJDb250cm9sbGVyJywgWyckc2NvcGUnLFxuICAgICgkc2NvcGUpID0+IHtcbiAgICAgIGxldCB2bSA9ICRzY29wZTtcbi8qXG4gICAgICBGb290ZXJMaW5rc1xuICAgICAgICAuZ2V0TGlzdCh2bS5xdWVyeSlcbiAgICAgICAgLnRoZW4obGlua3MgPT4ge1xuICAgICAgICAgIHZtLmxpbmtzID0gbGlua3NcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICBOb3RpZmljYXRpb25cbiAgICAgICAgICAgIC5lcnJvcihlcnIubWVzc2FnZSk7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIENvbnRhY3RzXG4gICAgICAgIC5vbmUoXCJcIilcbiAgICAgICAgLmdldCgpXG4gICAgICAgIC50aGVuKChjb250YWN0cykgPT4ge1xuICAgICAgICAgIHZtLmNvbnRhY3RzID0gY29udGFjdHM7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgTm90aWZpY2F0aW9uXG4gICAgICAgICAgICAuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuXG4gICAgICB2bS5uZXdzID0ge307XG4gICAgICB2bS5xdWVyeSA9IHtcbiAgICAgICAgc2tpcDogMCxcbiAgICAgICAgbGltaXQ6IDMsXG4gICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICBjcmVhdGVkQXQ6IC0xXG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIE5ld3NcbiAgICAgICAgLmdldExpc3Qodm0ucXVlcnkpXG4gICAgICAgIC50aGVuKG5ld3MgPT4ge1xuICAgICAgICAgIHZtLm5ld3MgPSBuZXdzXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgTm90aWZpY2F0aW9uXG4gICAgICAgICAgICAuZXJyb3IoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgICAgICAqL1xuICAgIH1dKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gZnJvbnRlbmQvcC1hcHAvbW9kdWxlcy9jb3JlL2NvbnRyb2xsZXJzL2Zvb3Rlci5jb250cm9sbGVyLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29yZScpLmZhY3RvcnkoJ1NlcnZpY2VIZWxwZXInLCBbJ1Jlc3Rhbmd1bGFyJyxcbiAgZnVuY3Rpb24gKFJlc3Rhbmd1bGFyKSB7XG4gICAgdGhpcy5jcmVhdGVSZXN0ZnVsUmVzb3VyY2UgPSAocm91dGUsIGZpZWxkcywgZGVmYXVsdHMpID0+IHtcbiAgICAgIHZhciByZXN0UmVzb3VyY2UgPSBSZXN0YW5ndWxhci5hbGwocm91dGUpO1xuICAgICAgcmVzdFJlc291cmNlLmZpZWxkcyA9IGZpZWxkcztcbiAgICAgIHJlc3RSZXNvdXJjZS5kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgICAgcmVzdFJlc291cmNlLnJlc3Rhbmd1bGFyaXplRWxlbWVudCA9IChwYXJlbnQsIGVsZW1lbnQsIHF1ZXJ5UGFyYW1zKSA9PiB7XG4gICAgICAgIFJlc3Rhbmd1bGFyLnJlc3Rhbmd1bGFyaXplRWxlbWVudChwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBxdWVyeVBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgcmVzdFJlc291cmNlLnJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbiA9IChwYXJlbnQsIGVsZW1lbnQsIHF1ZXJ5UGFyYW1zKSA9PiB7XG4gICAgICAgIFJlc3Rhbmd1bGFyLnJlc3Rhbmd1bGFyaXplQ29sbGVjdGlvbihwYXJlbnQsIGVsZW1lbnQsIHJvdXRlLCBxdWVyeVBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3RSZXNvdXJjZTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbl0pO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIGZyb250ZW5kL3AtYXBwL21vZHVsZXMvY29yZS9zZXJ2aWNlcy9zZXJ2aWNlLWhlbHBlci5zZXJ2aWNlLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnY29yZScpXG4gIC5mYWN0b3J5KCdGb290ZXJMaW5rcycsIFsnUmVzdGFuZ3VsYXInLCAnU2VydmljZUhlbHBlcicsIGZ1bmN0aW9uIChSZXN0YW5ndWxhciwgU2VydmljZUhlbHBlcikge1xuICAgIHZhciByb3V0ZSA9ICdmb290ZXItbGlua3MnLFxuICAgICAgZmllbGRzID0gW1xuICAgICAgICB7IG5hbWU6ICdsaW5rJyB9LFxuICAgICAgICB7IG5hbWU6ICd0ZXh0JyB9LFxuICAgICAgICB7IG5hbWU6ICdwb3NpdGlvbicgfVxuICAgICAgXTtcblxuICAgIHJldHVybiBTZXJ2aWNlSGVscGVyLmNyZWF0ZVJlc3RmdWxSZXNvdXJjZShyb3V0ZSwgZmllbGRzKTtcbiAgfV0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBmcm9udGVuZC9wLWFwcC9tb2R1bGVzL2NvcmUvc2VydmljZXMvZm9vdGVyLWxpbmtzLnNlcnZpY2UuanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVhBOzs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ3BCQTtBQUdBOzs7Ozs7O0FDSEE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDWkE7QUFDQTtBQUNBO0FBSUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0Q0E7Ozs7OztBQ25EQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUVBO0FBQUE7QUFDQTtBQU1BOzs7OyIsInNvdXJjZVJvb3QiOiIifQ==