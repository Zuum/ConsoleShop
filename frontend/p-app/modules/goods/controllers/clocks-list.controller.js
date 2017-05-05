'use strict';

const PER_PAGE = 9;

angular
    .module('goods')
    .controller('ClocksListController', ['$scope', 'Clocks', 'Restangular', ($scope, Clocks, Restangular) => {
      const qtyGetter = ((Restangular) => {
        return {
          getQty: Restangular.one('clocks')
              .customGET.bind({}, 'qty')
        }
      })(Employee);
      $scope.dirOptions = {
        goodsType: 'clocks',
        perPage: PER_PAGE,
        dataSource: Goods,
        qtyGetter
      };
    }]);
/*
angular
    .module('goods')
    .controller('ClocksListController', ['$scope', 'Clocks', 'Restangular',
      ($scope, Clocks, Restangular) => {
        const vm = $scope;
        const Qty = Restangular.one('clocks')
            .customGET.bind({}, 'qty');
        let QTY = PER_PAGE;
        vm.currentPage = 1;
        vm.query = {};

        const loadList = () => {
          const query = _.assign({
            skip: (vm.currentPage - 1) * PER_PAGE,
            limit: PER_PAGE,
            orderBy: {
              createdAt: -1
            }
          }, vm.query);
          vm.list = Clocks.getList(query).$object;
        };

        const loadQty = () => {
          Qty(vm.query)
              .then((result)=> {
                QTY = result;
              });
        };

        vm.backButtonState = () => {
          return vm.currentPage == 1 ? 'disabled' : '';
        };

        vm.nextButtonState = () => {
          return vm.currentPage >= Math.ceil(QTY / PER_PAGE) && 'disabled';
        };

        vm.next = () => {
          if (!vm.nextButtonState()) {
            vm.currentPage += 1;
            loadList();
          }
        };

        vm.back = () => {
          if (!vm.backButtonState()) {
            vm.currentPage = --vm.currentPage < 1 ? 0 : vm.currentPage;
            loadList();
          }
        };

        loadList();
        loadQty();
      }]);*/