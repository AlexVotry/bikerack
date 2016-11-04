'use strict';

(function() {

  angular
    .module('signup')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['SignUpService', '$location', '$rootScope'];
    function SignUpController(SignUpService, $location, $rootScope) {

      var vm = this;
      vm.credentials = {
        username: '',
        password: ''
      };
      vm.register = register;
      vm.success = false;

      function register() {
        SignUpService.register(vm.credentials).then(function(success) {
          vm.success = success;
          $rootScope.$broadcast('RegistrationSuccess');
          $location.path('/dashboard');
        });
      }
    }

})();

