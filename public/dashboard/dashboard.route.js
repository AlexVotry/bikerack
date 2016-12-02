'use strict';

(function() {

  angular
    .module('dashboard')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/dashboard/index.html',
        resolve: {
          authorized: isAuthenticated
        }
      });

    isAuthenticated.$inject = ['$location', 'SessionService'];
    function isAuthenticated($location, SessionService) {
      if (!SessionService.currentUser()) {
        $location.path('/');
      }
    }
  }

})();
