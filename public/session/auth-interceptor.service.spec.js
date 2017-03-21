describe('AuthInterceptor', function() {

  var AuthInterceptor
    , AuthToken
    , token
    , http
    , httpBackend
    , url
    ;

  beforeEach(module('session', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }));

  beforeEach(module(function($provide) {
    $provide.factory('AuthToken', AuthToken);

    function AuthToken() {
      return {
        read: function() { return token; }
      };
    }
  }));

  beforeEach(inject(function(_AuthInterceptor_, _AuthToken_, $http, $httpBackend) {
    AuthToken = _AuthToken_;
    AuthInterceptor = _AuthInterceptor_;
    http = $http;
    httpBackend = $httpBackend;

    url = '/nowhere';
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });

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

    it('adds the token to the "Authorization" header *for real*', function() {
      var config = { headers: {} };
      http.get(url, config);

      httpBackend.expect('GET', url, undefined, function(headers) {
        return headers['Authorization'] === 'Bearer ' + token;
      }).respond(200);

      httpBackend.flush();
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

    it('does not add an "Authorization" header to the request *for real*', function() {
      var config = { headers: {} };
      http.get(url, config);

      httpBackend.expect('GET', url, undefined, function(headers) {
        return !headers.hasOwnProperty('Authorization');
      }).respond(200);

      httpBackend.flush();
    });
  });

});
