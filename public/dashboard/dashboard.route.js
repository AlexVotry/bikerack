'use strict';

(function() {

  angular
    .module('dashboard')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/dashboard/index.html'
      });
  }

})();

