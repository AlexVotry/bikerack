'use strict';

(function() {

  function homePage () {
    return {
      go: go,
      title: title,
      welcome: welcome
    };
  }

  function go () {
    browser.get('/');
  }

  function title() {
    return browser.getTitle();
  }

  function welcome() {
    return element(by.id('welcome')).getText();
  }

  module.exports = homePage();

})();
