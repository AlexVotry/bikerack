'use strict';

(function() {

  angular
    .module('app')
    .config(configureAuthTokenService)
    .config(configureLogInService)
    .config(configureSignUpService)
    .config(configureAuthInterceptor)
    ;

  configureAuthTokenService.$inject = ['AuthTokenProvider', 'API'];
  function configureAuthTokenService(AuthTokenProvider, API) {
    AuthTokenProvider.setKey(API.jwtKey);
  }

  configureLogInService.$inject = ['LogInServiceProvider', 'API'];
  function configureLogInService(LogInServiceProvider, API) {
    LogInServiceProvider.setUrl(API.url);
    LogInServiceProvider.setEndpoint(API.endpoint.login);
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
