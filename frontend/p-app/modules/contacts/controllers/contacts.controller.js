angular
  .module('contacts')
  .controller('ContactsController', ['$scope','Contacts', ($scope, Contacts) => {
    let vm = $scope;

    Contacts.getList({})
      .then((result) => {
        console.log(result);
        vm.links = result;
      });
  }]);