var indexPage = require('../support/indexpage');
var homePage = require("../support/homepage");

const user = {
  username: 'Abner44',
  password: 'pass1234'
};

module.exports = function() {

  this.Given(/^the application has a home page$/, function() {
    // it better! ...no-op
    return;
  });

  this.When(/^I visit the home page$/, function() {
    return homePage.go();
  });

  this.Then(/^I see the name of the application$/, function() {
    return this.expect(homePage.title()).to.eventually.be.equal('bikerack');
  });

  this.Then(/^I see a welcome message$/, function() {
    return this.expect(homePage.welcome()).to.eventually.be.equal('Welcome!');
  });

  this.Given(/^I am a new user$/, function() {
    indexPage.go();
    indexPage.logout();

    // ??? create credentials for a new user
    // ??? verify user credentials are not in the database ???

    return;
  });

  this.When(/^I register for a new account$/, function() {
    return indexPage.signup(user);
  });

  this.Then(/^I am logged into the application$/, function() {
    return this.expect(indexPage.currentUser()).to.eventually.be.equal(user.username);
  });

  this.Then(/^I see my dashboard$/, function() {
    return this.expect(browser.getLocationAbsUrl()).to.eventually.match(/\/dashboard$/);
  });

  this.Given(/^I am an existing user$/, function() {
    // when the server is ready, do signup, then logout here

    indexPage.go();
    indexPage.logout();

    return;
  });

  this.When(/^I log in$/, function() {
    return indexPage.login(user);
  });

  this.Given(/^I am logged in$/, function() {

    indexPage.go();
    indexPage.logout();

    return indexPage.login(user);
  });

  this.Then(/^I see a logout button$/, function() {
    return this.expect(indexPage.logoutLink.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I do not see a signup button$/, function() {
    return this.expect(indexPage.signupLink.isDisplayed()).to.eventually.be.false;
  });

  this.Then(/^I do not see a login button$/, function() {
    return this.expect(indexPage.loginLink.isDisplayed()).to.eventually.be.false;
  });

  this.When(/^I log out$/, function() {
    return indexPage.logout();
  });

  this.Then(/^I am logged out/, function() {
    return this.expect(indexPage.currentUser()).to.eventually.be.empty;
  });

  this.Then(/^I see the homepage$/, function() {
    return this.expect(browser.getLocationAbsUrl()).to.eventually.match(/^\/$/);
  });

  this.Then(/^I see a login button$/, function() {
    return this.expect(indexPage.loginLink.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I see a signup button$/, function() {
    return this.expect(indexPage.signupLink.isDisplayed()).to.eventually.be.true;
  });

  this.Then(/^I do not see a logout button$/, function() {
    return this.expect(indexPage.logoutLink.isDisplayed()).to.eventually.be.false;
  });

  this.When(/^I visit my dashboard$/, function() {
    return 'pending';
    // return dashboardPage.go();
  });

  this.Then(/^I see a list of my bikes$/, function() {
    return 'pending';
    // return this.expect( /* find my bike list */ );
  });

};
