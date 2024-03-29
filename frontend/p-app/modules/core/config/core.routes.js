'use strict';

let run = ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
};
run.$inject = ['$rootScope', '$state', '$stateParams'];

let config = ($stateProvider, $urlRouterProvider) => {
  $urlRouterProvider
    .otherwise('/public/info');

  $stateProvider
    .state('public', {
      abstract: true,
      url: '/public',
      templateUrl: '/app-views/core/public.abstract.view.html'
    });
};
config.$inject = ['$stateProvider', '$urlRouterProvider'];

angular
  .module('core')
  .run(run)
  .config(config);