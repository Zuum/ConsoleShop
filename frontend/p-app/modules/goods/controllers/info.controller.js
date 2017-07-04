'use strict';

angular
    .module('goods')
    .controller('InfoController', ['$scope', 'Restangular', '$state',
      ($scope, Restangular, $state) => {
        $scope.dirOptions = {
          goods: Restangular.one(`goods`).customGET($state.params.id).$object
        };

      }]);
