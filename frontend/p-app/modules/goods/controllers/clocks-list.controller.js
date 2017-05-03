'use strict';

angular
    .module('goods')
    .controller('ClocksListController', ['$scope', 'Clocks', 'Restangular',
      ($scope, Clocks, Restangular) => {
        let vm = $scope;
        const vm = $scope;
        const Qty = Restangular.one('news')
            .customGET.bind({}, 'qty');
        let QTY = PER_PAGE;
        vm.currentPage = 1;
        vm.query = {};

        vm.formatter = (text) => {
          var result;
          var endIndex = text.indexOf('.', 250);
          if (endIndex < 0) {
            endIndex = text.indexOf('?', 250);
            if (endIndex < 0) {
              endIndex = text.indexOf('!', 250)
              if (endIndex < 0) {
                endIndex = text.indexOf(' ', 250);
                if (endIndex < 0) {
                  endIndex = text.length;
                }
              }
            }
          }
          result = text.substring(0, endIndex) + ' ...';
          return result;
        };

        const loadList = () => {
          const query = _.assign({
            skip: (vm.currentPage - 1) * PER_PAGE,
            limit: PER_PAGE,
            orderBy: {
              createdAt: -1
            }
          }, vm.query);
          vm.list = News.getList(query).$object;
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
      }]);