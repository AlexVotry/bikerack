'use strict';

(function() {

  angular
    .module('nav')
    .controller('NavController', NavController);

  NavController.$inject = ['SessionService', '$rootScope'];
  function NavController(SessionService, $rootScope) {

    var vm = this;
    vm.currentUser = {
      name: ''
    };

    var user = SessionService.currentUser();
    if (user) {
      vm.currentUser = user;
    }

    $rootScope.$on('RegistrationSuccess', function() {
      vm.currentUser = SessionService.currentUser();
    });
  }

})();

