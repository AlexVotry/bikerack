describe('SessionService', function() {

  var AuthToken
    , payload
    , SessionService
    ;

  beforeEach(module('session'));

  beforeEach(module(function($provide) {
    $provide.factory('AuthToken', AuthToken);

    function AuthToken() {
      return {
        decode: function() {
          if (!payload || !payload.user) {
            return;
          }
          return payload;
        }
      }
    }
  }));

  beforeEach(inject(function(_SessionService_, _AuthToken_) {
    SessionService = _SessionService_;
    AuthToken = _AuthToken_;
  }));

  context('when there is not a current user', function() {
    it('returns false', function() {
      payload = {};
      var user;

      user = SessionService.currentUser();

      expect(!!user).to.be.false;
    });
  });

  context('when there is a current user', function() {
    it('provides the user information', function() {
      payload = { user: { name: 'Abner', id: 2 } };
      var user;

      user = SessionService.currentUser();

      expect(user.name).to.be.equal(payload.user.name);
    });
  });
});

