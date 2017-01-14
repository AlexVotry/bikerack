'use strict';

(function() {

  angular
    .module('app')
    .config(configureAuthTokenService)
    .config(configureSignUpService)
    .config(configureAuthInterceptor)
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

  configureAuthInterceptor.$inject = ['$httpProvider'];
  function configureAuthInterceptor($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }

})();
