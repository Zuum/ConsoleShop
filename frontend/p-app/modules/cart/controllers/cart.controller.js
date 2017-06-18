'use strict';

const PER_PAGE = 9;

angular
  .module('goods')
  .controller('SteelListController', ['$scope', 'Goods', 'Restangular', ($scope, Goods, Restangular) => {
    $scope.dirOptions = {
      goodsType: 'steel',
      perPage: PER_PAGE,
      dataSource: Goods
    };
  }]);
