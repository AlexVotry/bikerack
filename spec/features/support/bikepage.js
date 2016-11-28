'use strict';

(function() {

  function bikePage() {

    return {
      go: go
    };

    function go(user) {
      browser.get('/bikes/' + user.username);
    }

  }

  module.exports = bikePage();

})();
