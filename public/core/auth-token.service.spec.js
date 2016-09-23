'use strict';

describe('AuthToken', function() {
    var AuthToken
      , key
      , payload
      , storage = {}
      , token
      ;

  beforeEach(module('core', function(AuthTokenProvider) {
    key = "simpleToken";
    AuthTokenProvider.setKey(key);
  }));

  beforeEach(inject(function($window, _AuthToken_) {
    AuthToken = _AuthToken_;
    storage = $window.localStorage;

    payload = { user: { name: "some guy", id: 3 }};
    var encodedPayload = $window.btoa(JSON.stringify(payload));
    token = ['header', encodedPayload, 'signature'].join('.');
  }));

  afterEach(function() {
    storage.removeItem(key);
  });

  context('When there is already a token in storage', function() {
    beforeEach(function() {
      storage.setItem(key, token);
    });

    it('overwrites existing token with new token', function() {
      var newToken = 'newToken';
      AuthToken.save(newToken);

      expect(storage.getItem(key)).to.be.equal(newToken);
    });

    it('reads the token', function() {
      expect(AuthToken.read()).to.be.equal(token);
    });

    it('deletes the token', function() {
      AuthToken.erase();

      expect(storage.getItem(key)).to.be.null;
    });

    it ('decodes the token', function() {
      expect(AuthToken.decode()).to.deep.equal(payload);
    });
  });

  context("When there isn't a token", function() {
    beforeEach(function() {
      storage.removeItem(key);
    });

    it('saves the token', function() {
      AuthToken.save(token);

      expect(storage.getItem(key)).to.be.equal(token);
    });

    it("it doesn't find a token and reads null", function() {
      expect(AuthToken.read()).to.be.null;
    });

    it('safely deletes a null token', function() {
      expect(function() { AuthToken.erase(); }).to.not.throw();
    });

    it("returns undefined when decoding", function() {
      expect(AuthToken.decode()).to.be.an('undefined');
    });
  });

});

