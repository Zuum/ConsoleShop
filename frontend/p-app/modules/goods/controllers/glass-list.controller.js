'use strict';

const PER_PAGE = 9;

angular
  .module('goods')
  .controller('GlassListController', ['$scope', 'Goods', 'Restangular', ($scope, Goods, Restangular) => {
    $scope.dirOptions = {
      goodsType: 'glass',
      perPage: PER_PAGE,
      dataSource: Goods
    };
  }]);
