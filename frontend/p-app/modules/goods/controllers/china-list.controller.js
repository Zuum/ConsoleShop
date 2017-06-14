'use strict';

const PER_PAGE = 9;

angular
  .module('goods')
  .controller('ChinaListController', ['$scope', 'Goods', 'Restangular', ($scope, Goods, Restangular) => {
    $scope.dirOptions = {
      goodsType: 'china',
      perPage: PER_PAGE,
      dataSource: Goods
    };
  }]);
