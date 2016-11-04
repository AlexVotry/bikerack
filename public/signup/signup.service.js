'use strict';

(function() {

  angular
    .module('signup')
    .provider('SignUpService', SignUpServiceProvider);

  function SignUpServiceProvider() {

    // TODO: need sensible defaults
    var config = {
      endpoint: '',
      url: ''
    };

    return {
      setEndpoint: setEndpoint,
      setUrl: setUrl,
      $get: SignUpService
    };

    // TODO: decide on a format (e.g. ends in slash?) and enforce here, or leave that for callers?
    function setUrl(url) {
      config.url = url;
    }

    // TODO: decide on a format (e.g. ends in slash?) and enforce here, or leave that for callers?
    function setEndpoint(endpoint) {
      config.endpoint = endpoint;
    }

    SignUpService.$inject = ['$http', '$window', 'AuthToken'];
    function SignUpService($http, $window, AuthToken) {

      return {
        register: register
      };

      function register(credentials) {
        var request = {
          method: 'POST',
          url: config.url + config.endpoint,
          data: credentials
        };

        return $http(request).then(function(response) {
          var token = response.data.token;
          AuthToken.save(token);

          return true;
        });
      }
    }
  }

})();

