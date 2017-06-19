'use strict';

angular
    .module('core')
    .controller('TopNavController', ['$scope', 'Restangular', 'TopNav', '$state',
      ($scope, Restangular, TopNav, $state) => {
        const vm = $scope;

        TopNav.getList({})
            .then((result) => {
              vm.links = result;
            });

        vm.active = (link) => {
          return $state.includes(link) ? 'active' : '';
        };

        vm.go = (link) =>{
          return $state.go("public." + link + ".main");
        }
      }]);