'use strict';

let run = ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
};
run.$inject = ['$rootScope', '$state', '$stateParams'];

let config = ($stateProvider, $urlRouterProvider) => {
  $stateProvider
      .state('public.goods', {
        abstract: true,
        url: '/goods',
        templateUrl: '/app-views/goods/goods.abstract.view.html'
      })
      .state('public.goods.clocks', {
        abstract: true,
        url: '/clocks',
        template: '<ui-view></ui-view>'
      })
      .state('public.goods.clocks.list', {
        url: '',
        templateUrl: '/app-views/goods/clocks/clocks.list.view.html',
        controller: 'ClocksListController',
        ncyBreadcrumb: {
          label: "Clocks"
        }
      })
      .state('public.goods.clocks.info', {
        url: '/:id',
        templateUrl: '/app-views/goods/clocks/clocks.info.view.html',
        controller: 'ClocksInfoController',
        ncyBreadcrumb: {
          label: '',
          parent: 'public.goods.clocks.main'
        }
      });
};
config.$inject = ['$stateProvider', '$urlRouterProvider'];

angular
    .module('goods')
    .run(run)
    .config(config);