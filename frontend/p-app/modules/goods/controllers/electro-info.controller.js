/**
 * Created by d1m4o on 04.05.17.
 */
'use strict';

angular
    .module('goods')
    .controller('ElectroInfoController', ['$scope', 'Restangular', '$state',
        ($scope, Restangular, $state) => {
            $scope.dirOptions = {
                goods: Restangular.one(`electro`).customGET($state.params.id).$object
            };
        }]);