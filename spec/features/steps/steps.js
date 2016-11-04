module.exports = function() {

  this.Given(/^the application has a home page$/, function() {
    // it better! ...no-op
    return;
  });

  this.When(/^I visit the home page$/, function() {
    return browser.get('/');
  });

  this.Then(/^I see the name of the application$/, function() {
    return this.expect(browser.getTitle()).to.eventually.be.equal('bikerack');
  });

  this.Then(/^I see a welcome message$/, function() {
    return this.expect(element(by.id('welcome')).getText()).to.eventually.be.equal('Welcome!');
  });

  this.Given(/^I am a new user$/, function() {
    // ugly hack; when available, switch to use /logout instead
    browser.get('/');
    browser.executeScript(function() {
      window.localStorage.clear();
    });
    //browser.get('/logout');

    // create credentials for a new user
    this.newUser = {
      username: "abner@example.com",
      password: "pass1234"
    };

    // ??? verify user credentials are not in the database ???

    return;
  });

  this.When(/^I register for a new account$/, function() {
    browser.get('/');
    element(by.linkText('Sign Up')).click();
    element(by.id('username')).sendKeys(this.newUser.username);
    element(by.id('password')).sendKeys(this.newUser.password);
    element(by.buttonText('Submit')).click();
    return;
  });

  this.Then(/^I am logged into the application$/, function() {
    return this.expect(element(by.id('current-user')).getText()).to.eventually.be.equal(this.newUser.username);
  });

  this.Then(/^I see my dashboard$/, function() {
    return this.expect(browser.getLocationAbsUrl()).to.eventually.match(/\/dashboard$/);
  });
}

