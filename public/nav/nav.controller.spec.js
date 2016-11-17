describe('NavController', function() {

  var controller
    , user = {}
    ;

  beforeEach(module('nav'));

  beforeEach(module(function($provide) {
    $provide.factory('SessionService', SessionService);

    function SessionService() {
      return {
        currentUser: function() { return user; },
        logout: function() { user = {}; }
      };
    }
  }));

  beforeEach(inject(function($controller, _SessionService_) {
    controller = $controller('NavController', { SessionService: _SessionService_ });
  }));

  it('initially has an empty username', function() {
    expect(controller.currentUser.name).to.be.empty;
  });

  it('has the current username when someone is logged in', function() {
    angular.extend(user, {
      name: 'abner_surlyman'
    });

    expect(controller.currentUser.name).to.equal(user.name);
  });

  it('has an empty username when the user logs out', function() {
    angular.extend(user, { name: 'abner_surlyman' });

    controller.logout();

    expect(controller.currentUser).to.be.empty;
  });

  it('knows there is a user logged in', function() {
    angular.extend(user, { name: 'abner_surlyman' });

    expect(controller.isLoggedIn).to.be.true;
  });

  it('knows there is not a user logged in', function() {
    controller.logout();

    expect(controller.isLoggedIn).to.be.false;
  });

});
