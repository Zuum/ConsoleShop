'use strict';

const PER_PAGE = 9;

angular
  .module('goods')
  .controller('ElectroListController', ['$scope', 'Goods', 'Restangular', ($scope, Goods, Restangular) => {
    $scope.dirOptions = {
      goodsType: 'electro',
      perPage: PER_PAGE,
      dataSource: Goods
    };
  }]);
