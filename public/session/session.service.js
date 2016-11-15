'use strict';

(function() {

  angular
    .module('session')
    .factory('SessionService', SessionService);

  SessionService.$inject = ['AuthToken'];
  function SessionService(AuthToken) {

    return {
      currentUser: currentUser,
      logout: logout
    };

    // TODO: check first to see if we already know who the current user is
    function currentUser() {
      var payload = AuthToken.decode();
      if (payload) {
        return payload.user;
      }
      return;
    }

    function logout() {
      AuthToken.erase();
    }
  }

})();
