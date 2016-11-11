'use strict';

(function() {

  angular
    .module('signup')
    .controller('LogInController', LogInController);

  LogInController.$inject = ['LogInService', '$location', '$rootScope'];
  function LogInController(LogInService, $location, $rootScope) {
    var vm = this;

    vm.credentials = {
      username: '',
      password: ''
    };

    vm.login = login;
    vm.success = false;

    function login() {
      LogInService.login(vm.credentials).then(function(success) {
        vm.success = success;
        $rootScope.$broadcast('RegistrationSuccess');
        $location.path('/dashboard');
      });
    }
  }
})();
