'use strict';

(function() {

  angular
    .module('app')
    .config(configureAuthTokenService)
    .config(configureSignUpService)
    ;

  configureAuthTokenService.$inject = ['AuthTokenProvider', 'API'];
  function configureAuthTokenService(AuthTokenProvider, API) {
    AuthTokenProvider.setKey(API.jwtKey);
  }

  configureSignUpService.$inject = ['SignUpServiceProvider', 'API'];
  function configureSignUpService(SignUpServiceProvider, API) {
    SignUpServiceProvider.setUrl(API.url);
    SignUpServiceProvider.setEndpoint(API.endpoint.signup);
  }

})();

