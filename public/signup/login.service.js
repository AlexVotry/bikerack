'use strict';

(function() {

  angular
    .module('signup')
    .provider('LogInService', LogInServiceProvider);

  function LogInServiceProvider() {

    // TODO: need sensible defaults
    var config = {
      endpoint: '',
      url: ''
    };

    return {
      setEndpoint: setEndpoint,
      setUrl: setUrl,
      $get: LogInService
    };

    // TODO: decide on a format (e.g. ends in slash?) and enforce here, or leave that for callers?
    function setUrl(url) {
      config.url = url;
    }

    // TODO: decide on a format (e.g. ends in slash?) and enforce here, or leave that for callers?
    function setEndpoint(endpoint) {
      config.endpoint = endpoint;
    }

    LogInService.$inject = ['$http', 'AuthToken'];
    function LogInService($http, AuthToken) {

      return {
        login: login
      };

      function login(credentials) {
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
