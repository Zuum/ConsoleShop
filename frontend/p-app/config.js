'use strict';

const appName = 'mainApp';
const dependencies = [
  'restangular',
  'ui.router',
  'ncy-angular-breadcrumb'
];

module.exports = {
  appName,
  dependencies,
  registerModule (moduleName, moduleDependencies) {
    // Create angular module
    const newModule = angular.module(moduleName, moduleDependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(appName).requires.push(moduleName);

    return newModule;
  }
};