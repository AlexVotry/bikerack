describe('SignUpController', function() {

  var controller
    , rootScope
    ;

  beforeEach(module('signup'));

  beforeEach(module(function($provide){
    $provide.factory('SignUpService', SignUpService);

    function SignUpService($q) {
      return {
        register: function(credentials) {
          var deferred = $q.defer();
          deferred.resolve(true);
          return deferred.promise;
        }
      };
    }
  }));

  beforeEach(inject(function($controller, $rootScope, _SignUpService_) {
      rootScope =  $rootScope;
      controller = $controller('SignUpController', { SignUpService: _SignUpService_ });
  }));

  it('registers a new user with valid credentials', function() {
    controller.credentials = {
      username: 'abner',
      password: 'pass1234'
    };

    controller.register();
    rootScope.$apply();

    expect(controller.success).to.be.true;
  });

  it('routes to the dashboard after successful registration', inject(function($location) {
    controller.credentials = {
      username: 'abner',
      password: 'pass1234'
    };

    controller.register();
    rootScope.$apply();

    expect($location.path()).to.be.equal('/dashboard');
  }));

  it('broadcasts a success message', function() {
    var broadcast = sinon.spy(rootScope, '$broadcast');

    controller.credentials = {
      username: 'abner',
      password: 'pass1234'
    };

    controller.register();
    rootScope.$apply();

    expect(broadcast).to.have.been.calledWith('RegistrationSuccess');
  });

  xit('does not register a new user with invalid credentials', function() {
  });
});
