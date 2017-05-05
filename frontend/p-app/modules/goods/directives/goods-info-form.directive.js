'use strict';

angular
  .module('registry')
  .filter('notAvailable', () => {
    return (data) => {
      return data || 'данные отсутствуют';
    };
  })
  .directive('schoolInfo', ['$state', ($state) => {
    const controller = ['$scope', ($scope) => {
      const vm = $scope;
      const options = $scope.options;

      vm.school = options.school;

      vm.backToList = () => {
        $state.go($state.current.name.replace('info', 'list'));
      };

      vm.showContacts = (school) => {
        return school.contacts && school.contacts.length;
      };

      vm.showDescription = (cg, contact) => {
        if (contact.description && cg.name.toLowerCase() != contact.description.toLowerCase()) {
          return ` (${contact.description})`;
        }
        return '';
      };

      vm.urlText = (url) => {
        return url.replace('http://', '');
      }
    }];

    return {
      restrict: 'AEC',
      templateUrl: '/views/registry/schools-info-form.view.html',
      controller,
      scope: {
        options: '='
      }
    };
  }]);