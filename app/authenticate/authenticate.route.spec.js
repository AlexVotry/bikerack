'use strict';

import app from '../app';
import Db from '../db';
import request from 'supertest-as-promised';
import User from '../user/user';

describe('authenticate.route', function() {

  let db = new Db();
  let user;

  before(function() {
    return db.connect()
      .then(function() {
        user = new User();
        return user.collection.remove();
      });
  });

  const credentials = {
    username: 'Abner',
    password: 'abcd1234'
  };

  describe('POST /api/v1/signup', function() {
    it('responds with status 201', function() {
      return request(app)
        .post('/api/v1/signup')
        .send({ credentials: credentials })
        .expect(201);
    });

    it('responds with json content', function() {
      return request(app)
        .post('/api/v1/signup')
        .send({ credentials: credentials })
        .expect('Content-Type', /json/);
    });

    it('responds with a token', function() {
      const JWT_REGEX = /^\{\"token\":\"[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\"\}$/;

      return request(app)
        .post('/api/v1/signup')
        .send({ credentials: credentials })
        .expect(JWT_REGEX);
    });

    // TODO: it responds with status 400/401 for a malformed request, i.e. missing credentials
  });

  describe('POST /api/v1/login', function() {

    beforeEach(function() {
      return user.createOne(credentials);
    });

    it('responds with status 201', function() {
      return request(app)
        .post('/api/v1/login')
        .send({ credentials: credentials })
        .expect(201);
    });

    it('responds with json content', function() {
      return request(app)
        .post('/api/v1/login')
        .send({ credentials: credentials })
        .expect('Content-Type', /json/);
    });

    it('responds with a token', function() {
      const JWT_REGEX = /^\{\"token\":\"[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\"\}$/;

      return request(app)
        .post('/api/v1/login')
        .send({ credentials: credentials })
        .expect(JWT_REGEX);
    });

    // TODO: it responds with status 400/401 for a malformed request, i.e. missing credentials
  });

  /* This seems like a bug in mocha.
   * According to the documentation, afterEach() should only run once following each describe() block,
   * not--as we're using it here--once after each nested it() block.
   */
  afterEach(function() {
    return db.get().collection('users').remove();
  });

  after(function() {
    return db.close();
  });
});
