describe('LogInController', function() {

  var controller
    , rootScope
    ;

  beforeEach(module('signup'));

  beforeEach(module(function($provide) {
    $provide.factory('LogInService', LogInService);

    function LogInService($q) {
      return {
        login: function(credentials) {
          var deferred = $q.defer();
          deferred.resolve(true);
          return deferred.promise;
        }
      };
    }
  }));

  beforeEach(inject(function($controller, $rootScope, _LogInService_) {
      rootScope =  $rootScope;
      controller = $controller('LogInController', { LogInService: _LogInService_ });
  }));

  it('logs in a user with valid credentials', function() {
    controller.credentials = {
      username: 'abner',
      password: 'pass1234'
    };

    controller.login();
    rootScope.$apply();

    expect(controller.success).to.be.true;
  });

  it('routes to the dashboard after successful login', inject(function($location) {
    controller.credentials = {
      username: 'abner',
      password: 'pass1234'
    };

    controller.login();
    rootScope.$apply();

    expect($location.path()).to.be.equal('/dashboard');
  }));

  it('broadcasts a success message', function() {
    var broadcast = sinon.spy(rootScope, '$broadcast');

    controller.credentials = {
      username: 'abner',
      password: 'pass1234'
    };

    controller.login();
    rootScope.$apply();

    expect(broadcast).to.have.been.calledWith('RegistrationSuccess');
  });

  xit('does not login a new user with invalid credentials', function() {
  });
});
