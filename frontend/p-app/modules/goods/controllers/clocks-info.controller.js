'use strict';

angular
    .module('goods')
    .controller('ClocksInfoController', ['$scope', 'Restangular', '$state',
      ($scope, Restangular, $state) => {
        $scope.dirOptions = {
          school: Restangular.one(`school`).customGET($state.params.id).$object
        };
      }]);