'use strict';

angular
    .module('core')
    .controller('TopNavController', ['$scope', 'Restangular', 'TopNav', '$state',
      ($scope, Restangular, TopNav, $state) => {
        const vm = $scope;

        TopNav.getList({})
            .then((result) => {
              console.log(result);
              vm.links = result;
            });

        vm.active = (link) => {
          return $state.includes(link.link.replace('.main', '')) ? 'active' : '';
        };
      }]);