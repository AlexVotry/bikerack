'use strict';

(function() {

   angular
     .module('core')
     .provider('AuthToken', AuthTokenProvider);

  AuthTokenProvider.$inject = ['AuthTokenStorageKey'];
  function AuthTokenProvider(AuthTokenStorageKey) {

    var config = {
      key: AuthTokenStorageKey
    };

    return {
      setKey: setKey,
      $get: AuthToken
    }

    function setKey(key) {
      config.key = key;
    }

    AuthToken.$inject = ['$window'];
    function AuthToken($window) {
      var storage = $window.localStorage;

      function save(token) {
        storage.setItem(config.key, token);
      }

      function read() {
        return storage.getItem(config.key);
      }

      function erase() {
        storage.removeItem(config.key);
      }

      function decode() {
        var token = read();
        if (token) {
          var payload = $window.atob(token.split('.')[1]);
          return JSON.parse(payload);
        }
        return;
      }

      return {
        save: save,
        read: read,
        erase: erase,
        decode: decode
      };
    };
  };
})();

