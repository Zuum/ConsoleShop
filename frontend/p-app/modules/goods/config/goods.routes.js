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
    // clocks
    .state('public.goods.clocks', {
      abstract: true,
      url: '/clocks',
      template: '<ui-view></ui-view>'
    })
    .state('public.goods.clocks.list', {
      url: '',
      templateUrl: '/app-views/goods/goods.list.view.html',
      controller: 'ClocksListController',
      ncyBreadcrumb: {
        label: "Clocks"
      }
    })
    .state('public.goods.clocks.info', {
      url: '/:id',
      templateUrl: '/app-views/goods/goods.info.view.html',
      controller: 'InfoController',
      ncyBreadcrumb: {
        label: '',
        parent: 'public.goods.clocks.list'
      }
    })
  // chemistry
      .state('public.goods.chemistry', {
          abstract: true,
          url: '/chemistry',
          template: '<ui-view></ui-view>'
      })
      .state('public.goods.chemistry.list', {
          url: '',
          templateUrl: '/app-views/goods/goods.list.view.html',
          controller: 'ChemistryListController',
          ncyBreadcrumb: {
              label: "Chemistry"
          }
      })
      .state('public.goods.chemistry.info', {
          url: '/:id',
          templateUrl: '/app-views/goods/goods.info.view.html',
          controller: 'InfoController',
          ncyBreadcrumb: {
              label: '',
              parent: 'public.goods.chemistry.list'
          }
      })
  // china
    .state('public.goods.china', {
        abstract: true,
        url: '/china',
        template: '<ui-view></ui-view>'
    })
    .state('public.goods.china.list', {
        url: '',
        templateUrl: '/app-views/goods/goods.list.view.html',
        controller: 'ChinaListController',
        ncyBreadcrumb: {
            label: "China"
        }
    })
    .state('public.goods.china.info', {
        url: '/:id',
        templateUrl: '/app-views/goods/goods.info.view.html',
        controller: 'InfoController',
        ncyBreadcrumb: {
            label: '',
            parent: 'public.goods.china.list'
        }
    })
  // electro
    .state('public.goods.electro', {
        abstract: true,
        url: '/electro',
        template: '<ui-view></ui-view>'
    })
    .state('public.goods.electro.list', {
        url: '',
        templateUrl: '/app-views/goods/goods.list.view.html',
        controller: 'ElectroListController',
        ncyBreadcrumb: {
            label: "Electro"
        }
    })
    .state('public.goods.electro.info', {
        url: '/:id',
        templateUrl: '/app-views/goods/goods.info.view.html',
        controller: 'InfoController',
        ncyBreadcrumb: {
            label: '',
            parent: 'public.goods.electro.list'
        }
    })
  // glass
    .state('public.goods.glass', {
        abstract: true,
        url: '/glass',
        template: '<ui-view></ui-view>'
    })
    .state('public.goods.glass.list', {
        url: '',
        templateUrl: '/app-views/goods/goods.list.view.html',
        controller: 'GlassListController',
        ncyBreadcrumb: {
            label: "Glass"
        }
    })
    .state('public.goods.glass.info', {
        url: '/:id',
        templateUrl: '/app-views/goods/goods.info.view.html',
        controller: 'InfoController',
        ncyBreadcrumb: {
            label: '',
            parent: 'public.goods.glass.list'
        }
    })
  // plastic
    .state('public.goods.plastic', {
        abstract: true,
        url: '/plastic',
        template: '<ui-view></ui-view>'
    })
    .state('public.goods.plastic.list', {
        url: '',
        templateUrl: '/app-views/goods/goods.list.view.html',
        controller: 'PlasticListController',
        ncyBreadcrumb: {
            label: "Plastic"
        }
    })
    .state('public.goods.plastic.info', {
        url: '/:id',
        templateUrl: '/app-views/goods/goods.info.view.html',
        controller: 'InfoController',
        ncyBreadcrumb: {
            label: '',
            parent: 'public.goods.plastic.list'
        }
    })
  // steel
    .state('public.goods.steel', {
        abstract: true,
        url: '/steel',
        template: '<ui-view></ui-view>'
    })
    .state('public.goods.steel.list', {
        url: '',
        templateUrl: '/app-views/goods/goods.list.view.html',
        controller: 'SteelListController',
        ncyBreadcrumb: {
            label: "Steel"
        }
    })
    .state('public.goods.steel.info', {
        url: '/:id',
        templateUrl: '/app-views/goods/goods.info.view.html',
        controller: 'InfoController',
        ncyBreadcrumb: {
            label: '',
            parent: 'public.goods.steel.list'
        }
    })
};
config.$inject = ['$stateProvider', '$urlRouterProvider'];

angular
    .module('goods')
    .run(run)
    .config(config);