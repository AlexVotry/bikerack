'use strict';

(function() {

  function IndexPage() {

    var loginLink = element(by.id('login-link'));
    var logoutLink = element(by.id('logout-link'));
    var signupLink = element(by.id('signup-link'));

    return {
      currentUser: currentUser,
      go: go,
      login: login,
      loginLink: loginLink,
      logout: logout,
      logoutLink: logoutLink,
      signup: signup,
      signupLink: signupLink
    };

    function go() {
      browser.get('/');
    }

    function login(user) {
      loginLink.click();
      element(by.id('login-username')).sendKeys(user.username);
      element(by.id('login-password')).sendKeys(user.password);
      element(by.buttonText('Log In')).click();
    }

    function logout() {
      // ToDo: still concerned about race condition here
      logoutLink.isDisplayed().then(function(visible) {
        if (visible) {
          logoutLink.click();
        }
      });
    }

    function signup(user) {
      signupLink.click();
      element(by.id('username')).sendKeys(user.username);
      element(by.id('password')).sendKeys(user.password);
      element(by.buttonText('Submit')).click();
    }

    function currentUser() {
      return element(by.id('current-user')).getText();
    }

  }

  module.exports = IndexPage();

})();
