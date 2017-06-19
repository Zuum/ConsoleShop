'use strict';

angular
    .module('core')
    .controller('NavBarController', ['$scope', 'Restangular', 'NavBar', '$state',
      ($scope, Restangular, NavBar, $state) => {
        const vm = $scope;

        NavBar.getList({})
            .then((result) => {
              vm.links = result;
            });
        vm.go = (link) => {
          $state.go('public.goods.'+ link +'.list');
        };

        vm.active = (link) => {
          var currentState = $state.current.name;
          if ( currentState.indexOf(link) != -1 ){
            return 'active';
          }
          else {
            return ''
          }
        };
      }]);