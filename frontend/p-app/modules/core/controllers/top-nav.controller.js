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

        vm.go = (link) =>{
          return $state.go("public." + link + ".main");
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