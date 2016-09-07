describe('karma test runner', function() {

  // passing test
  it('knows the truth when it sees it', function() {
    expect(true).to.be.true;
  });

  // failing test
  it('knows the truth when it does not see it', function () {
    expect(false).to.be.true;
  });
});
