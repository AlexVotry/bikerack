var bikePage = require('../support/bikepage');
var indexPage = require('../support/indexpage');

const user = {
  username: 'Abner44',
  password: 'pass1234'
};

module.exports = function() {

  this.Given(/^I see my bike list$/, function() {
    browser.ignoreSynchronization = true;
    indexPage.go();
    indexPage.logout();
    indexPage.login(user);
    // return browser.get('/bikes/' + user.username);
    return bikePage.go(user);
  });

  this.When(/^I add a bike$/, function() {
    return 'pending';
  });

  this.Then(/^I see the bike in the list$/, function() {
    return 'pending';
  });

};
