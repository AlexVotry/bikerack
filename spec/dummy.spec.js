import { expect } from 'chai';

describe.skip('mocha test runner', () => {

  // passing test
  it('knows the truth when it sees it', () => {
    expect(true).to.be.true;
  });

  // failing test
  it('knows the truth when it does not see it', () => {
    expect(false).to.be.true;
  });
});

