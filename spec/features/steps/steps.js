module.exports = function() {

  this.Given(/^the application has a home page$/, function() {
    // it better! ...noop
    return;
  });

  this.When(/^I visit the home page$/, function() {
    return browser.get('/');
  });

  this.Then(/^I see the name of the application$/, function() {
    return this.expect(browser.getTitle()).to.eventually.be.equal('bikerack');
  });
}

