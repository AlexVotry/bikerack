'use strict';

(function() {

  angular
    .module('app')
    .config(configureAuthTokenService)
    ;

  configureAuthTokenService.$inject = ['AuthTokenProvider', 'API'];
  function configureAuthTokenService(AuthTokenProvider, API) {
    AuthTokenProvider.setKey(API.jwtKey);
  }

})();

