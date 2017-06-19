'use strict';

let run = ($rootScope, $state, $stateParams) => {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
};
run.$inject = ['$rootScope', '$state', '$stateParams'];

let config = ($stateProvider, $urlRouterProvider) => {
  $stateProvider
      .state('public.cart', {
        abstract: true,
        url: '/cart',
        templateUrl: '/app-views/cart/cart.abstract.view.html'
      })
      .state('public.cart.ordering', {
        url: '/ordering',
        templateUrl: '/app-views/cart/cart.ordering.view.html',
        controller: 'CartOrderingController',
        ncyBreadcrumb: {
          label: "Cart"
        }
      })
      .state('public.cart.content', {
        url: '/content',
        templateUrl: '/app-views/cart/cart.content.view.html',
        controller: 'CartContentController',
        ncyBreadcrumb: {
          label: "Cart"
        }
      })
};
config.$inject = ['$stateProvider', '$urlRouterProvider'];

angular
    .module('cart')
    .run(run)
    .config(config);