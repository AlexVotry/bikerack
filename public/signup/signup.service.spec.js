describe('SignUpService', function() {

  var api =
      { url: ''
      , endpoint: ''
      }
    , AuthToken
    , credentials = {}
    , data = {}
    , httpBackend
    , SignUpService
    , token
    , url
    ;

  beforeEach(module('signup', function(SignUpServiceProvider) {
    api.url = 'some.server.org';
    api.endpoint = '/someplace';

    SignUpServiceProvider.setUrl(api.url);
    SignUpServiceProvider.setEndpoint(api.endpoint);
  }));

  beforeEach(module(function($provide) {
    $provide.factory('AuthToken', AuthToken);

    function AuthToken() {
      return {
        save: sinon.spy()
      };
    }
  }));

  beforeEach(inject(function($httpBackend, _AuthToken_, _SignUpService_) {
    AuthToken = _AuthToken_;
    httpBackend = $httpBackend;
    SignUpService = _SignUpService_;

    credentials = {
      username: 'abner',
      password: 'pass1234'
    };

    token = 'dummytoken';
    data = {
      token: token
    };

    url = api.url + api.endpoint;
    httpBackend.whenPOST(url).respond(201, data);
  }));

  afterEach(function() {
    httpBackend.verifyNoOutstandingRequest();
    httpBackend.verifyNoOutstandingExpectation();
  });

  it('connects to the server', function() {
    SignUpService.register();

    httpBackend.expectPOST(url);
    httpBackend.flush();
  });

  it('sends the credentials to the server', function() {
    SignUpService.register(credentials);

    httpBackend.expectPOST(url, credentials);
    httpBackend.flush();
  });

  it('saves the token when registration is successful', function() {
    SignUpService.register(credentials);
    httpBackend.flush();

    expect(AuthToken.save).to.have.been.calledWith(token);
  });

  xit('does "something else" when registration is unsuccessful', function() {
    // 401 Unauthorized: semantically, "unauthenticated"; authentication failed or was not provided
    // 403 Forbidden: credentials are not sufficient for access to the requested resource
    // parse the error message from the response header and/or body, if present
    // emit a failure message

    // !!! this won't override the beforeEach; move this block to it's own context
    httpBackend.whenPOST(url).respond(401);

    SignUpService.register(credentials);
    httpBackend.flush();

    expect(AuthToken.save).to.have.not.been.called;
  });
});

