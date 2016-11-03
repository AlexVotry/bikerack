'use strict';

(function() {

  angular
    .module('session')
    .factory('AuthInterceptor', AuthInterceptor);

  AuthInterceptor.$inject = ['AuthToken'];
  function AuthInterceptor(AuthToken) {

    function request(config) {
      var token = AuthToken.read();

      if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
      }

      return config;
    }

    return { request: request };
  }

})();

