'use strict';

let run = ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
};
run.$inject = ['$rootScope', '$state', '$stateParams'];

let config = ($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('public.contacts', {
      abstract: true,
      url: '/contacts',
      template: `<div ui-view></div>`
    })
    .state('public.contacts.main', {
      url: '',
      templateUrl: '/app-views/contacts/contacts.view.html',
      controller: 'ContactsController',
      ncyBreadcrumb: {
        label: ""
      }
    });
};
config.$inject = ['$stateProvider', '$urlRouterProvider'];

angular
  .module('contacts')
  .run(run)
  .config(config);