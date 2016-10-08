describe('NavController', function() {

  var controller
    , rootScope
    , user = {}
    ;

  beforeEach(module('nav'));

  beforeEach(module(function($provide) {
    $provide.factory('SessionService', SessionService);

    function SessionService() {
      return {
        currentUser: function() { return user; }
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

  //it('has an empty username when the user logs out');

});

