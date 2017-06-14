'use strict';

const PER_PAGE = 9;

angular
  .module('goods')
  .controller('PlasticListController', ['$scope', 'Goods', 'Restangular', ($scope, Goods, Restangular) => {
    $scope.dirOptions = {
      goodsType: 'plastic',
      perPage: PER_PAGE,
      dataSource: Goods
    };
  }]);
