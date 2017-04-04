'use strict';

let run = ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
};
run.$inject = ['$rootScope', '$state', '$stateParams'];

let config = ($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('public.info', {
      abstract: true,
      url: '/info',
      templateUrl: '/app-views/info/info.abstract.view.html'
    })
    .state('public.info.main', {
      url: '',
      templateUrl: '/app-views/info/info.view.html',
      controller: 'InfoController',
      ncyBreadcrumb: {
        label: ""
      }
    });
};
config.$inject = ['$stateProvider', '$urlRouterProvider'];

angular
  .module('info')
  .run(run)
  .config(config);