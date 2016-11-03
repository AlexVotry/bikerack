describe('AuthInterceptor', function() {

  var AuthInterceptor
    , AuthToken
    , token
    ;

  beforeEach(module('session'));

  beforeEach(module(function($provide) {
    $provide.factory('AuthToken', AuthToken);

    function AuthToken() {
      return {
        read: function() { return token; }
      };
    }
  }));

  beforeEach(inject(function(_AuthInterceptor_, _AuthToken_) {
    AuthToken = _AuthToken_;
    AuthInterceptor = _AuthInterceptor_;
  }));

  context('when there is a token in storage', function() {

    beforeEach(function() {
      token = 'dummytoken';
    });

    it('adds an "Authorization" header to the request', function() {
      var config = AuthInterceptor.request({ headers: {} });

      expect(config.headers).to.include.keys('Authorization');
    });

     it('adds the token to the "Authorization" header', function() {
       var config = AuthInterceptor.request({ headers: {} });

       expect(config.headers['Authorization']).to.equal('Bearer ' + token);
     });
  });

  context('when there is not a token in storage', function() {

    beforeEach(function() {
      token = '';
    });

    it('does not add an "Authorization" header to the request', function() {
      var config = AuthInterceptor.request({ headers: {} });

      expect(config.headers).to.not.include.keys('Authorization');
    });
  });

});

