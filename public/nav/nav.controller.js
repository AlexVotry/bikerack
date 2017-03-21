'use strict';

(function() {

  angular
    .module('nav')
    .controller('NavController', NavController);

  NavController.$inject = ['SessionService', '$rootScope', '$location'];
  function NavController(SessionService, $rootScope, $location) {

    var vm = this;
    vm.currentUser = {
      name: ''
    };
    vm.isLoggedIn = false;
    vm.logout = logout;

    var user = SessionService.currentUser();
    if (user) {
      vm.currentUser = user;
      vm.isLoggedIn = true;
    }

    $rootScope.$on('RegistrationSuccess', function() {
      vm.currentUser = SessionService.currentUser();
      vm.isLoggedIn = true;
    });

    function logout() {
      SessionService.logout();
      vm.currentUser = {};
      vm.isLoggedIn = false;
      $location.path('/');
    }
  }

})();
