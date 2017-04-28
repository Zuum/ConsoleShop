'use strict';

angular
  .module('core')
  .controller('FooterController', ['$scope',
    ($scope) => {
      let vm = $scope;

      FooterLinks
        .getList(vm.query)
        .then(links => {
          vm.links = links
        })
        .catch((err) => {
          Notification
            .error(err.message);
          console.log(err);
        });

      Contacts
        .one("")
        .get()
        .then((contacts) => {
          vm.contacts = contacts;
        })
        .catch((err) => {
          Notification
            .error(err.message);
          console.log(err);
        });

      vm.news = {};
      vm.query = {
        skip: 0,
        limit: 3,
        orderBy: {
          createdAt: -1
        }
      };

      News
        .getList(vm.query)
        .then(news => {
          vm.news = news
        })
        .catch((err) => {
          Notification
            .error(err.message);
          console.log(err);
        });
        */
    }]);