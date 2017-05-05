'use strict';

angular
    .module('goods')
    .controller('ClocksInfoController', ['$scope', 'Restangular', '$state',
      ($scope, Restangular, $state) => {
        $scope.dirOptions = {
          clock: Restangular.one(`clocks`).customGET($state.params.id).$object
        };
      }]);