'use strict';

(function() {

  angular
    .module('bikes')
    .config(config);

  function config($stateProvider) {
    $stateProvider
      .state('bikes', {
        url: '/bikes/:username',
        templateUrl: 'bikes/index.html',
        controllerAs: 'bikes',
        controller: 'BikesController'
      });
  }

})();
