'use strict';

(function() {

  var API = {
    url: '',
    endpoint: {
      login: '/api/v1/login',
      signup: '/api/v1/signup'
    },
    jwtKey: 'bikerackJWT'
  };

  angular
    .module('app')
    .constant('API', API)
    ;

})();
