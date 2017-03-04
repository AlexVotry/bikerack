'use strict';

import auth from './authenticate';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import Db from '../db';
import jwt from 'jsonwebtoken';
import User from '../user/user';
import util from '../util';

chai.use(chaiAsPromised);
const expect = chai.expect;

const _SECRET = 'secret';

describe('module authenticate', function() {

  const db = new Db();
  let users;

  const usersList = [
    { username: 'user0', password: 'password0' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];

  before(function() {
    return db.connect()
      .then(function() {
        users = new User();
        return users.collection.remove();
      });
  });

  beforeEach(function() {
    return users.createMany(usersList);
  });

  describe('authenticateJWT()', function() {

    let userObj = { user: usersList[0] };
    let token = jwt.sign(userObj, _SECRET);

    it('throws an error when there is not an authorization header', function() {
      let request = {
        headers: {
          notAnAuthorizationHeader: 'Bearer ' + token
        }
      };

      expect(function() { auth.authenticateJWT(request) }).to.throw(/missing Authorization header/);
    });

    it('throws an error when the authorization header does not start with "Bearer "', function() {
      let request = {
        headers: {
          authorization: 'NotBearer ' + token
        }
      };

      expect(function() { auth.authenticateJWT(request) }).to.throw(/bad Authorization format/);
    });

    it('throws an error when the JWT is invalid', function() {
      let request = {
        headers: {
          authorization: 'Bearer ' + 'notAValidToken'
        }
      };

      expect(function() { auth.authenticateJWT(request) }).to.throw(Error);
    });

    it('adds a token to the request object', function() {
      let request = {
        headers: {
          authorization: 'Bearer ' + token
        }
      };
      auth.authenticateJWT(request);

      expect(util.hasCaseInsensitiveKey(request, 'token')).to.be.true;
    });

  });

  describe('register()', function() {
    it('returns a jwt when it registers a new users', function() {
      const JWT_REGEX = /^[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*$/;

      let credentials = {
        username: 'Abner',
        password: 'abcd1234'
      };

      return expect(auth.register(credentials)).to.eventually.match(JWT_REGEX);
    });

    it('returns an error if the username is empty', function() {
      let credentials = {
        username: '',
        password: usersList[0].password
      };
      return expect(auth.register(credentials)).to.be.rejectedWith('username cannot be empty');
    });

    it('returns an error if the password is empty', function() {
      let credentials = {
        username: usersList[0].username,
        password: ''
      };
      return expect(auth.register(credentials)).to.be.rejectedWith('password missing');
    });

    it('returns an error if the username already exists', function() {
      let credentials = usersList[0];

      return expect(auth.register(credentials)).to.be.rejectedWith('duplicate user');
    });

    it('creates a new user account', function() {
      let credentials = {
        username: 'Abner',
        password: 'abcd1234'
      };

      return auth.register(credentials)
        .then(function() {
          return users.findOne(credentials)
            .then(function(newUser) {
              return expect(newUser).to.not.be.null;
            });
        });
    });
  });

  describe('verify()', function() {
    it('returns a jwt when the credentials are valid', function() {
      const JWT_REGEX = /^[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*$/;

      let credentials = usersList[0];

      return expect(auth.verify(credentials)).to.eventually.match(JWT_REGEX);
    });

    it('returns an error if the username is empty', function() {
      let credentials = {
        username: '',
        password: usersList[0].password
      };
      return expect(auth.verify(credentials)).to.be.rejectedWith('username cannot be empty');
    });

    it('returns an error if the password is empty', function() {
      let credentials = {
        username: usersList[0].username,
        password: ''
      };
      return expect(auth.verify(credentials)).to.be.rejectedWith('password missing');
    });

    it('returns an error is the user is not found', function() {
      let credentials = {
        username: 'Abner',
        password: 'abcd1234'
      };
      return expect(auth.verify(credentials)).to.be.rejectedWith('username does not exist');
    });

    it('returns an error if the password is incorrect', function() {
      let credentials = {
        username: usersList[0].username,
        password: 'badpassword'
      };
      return expect(auth.verify(credentials)).to.be.rejectedWith('user name or password is incorrect');
    });
  });

  afterEach(function() {
    return users.collection.remove();
  });

  after(function() {
    return db.close();
  });
});
