'use strict';

(function() {

  var API =
    { url: ''
    , endpoint:
      { signup: '/api/v1/signup'
      }
    , jwtKey: 'bikerackJWT'
    }
    ;

  angular
    .module('app')
    .constant('API', API)
    ;

})();

