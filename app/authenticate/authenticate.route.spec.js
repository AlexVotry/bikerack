'use strict';

import app from '../app';
import request from 'supertest-as-promised';

describe('authenticate.route', function() {

  const JWT_REGEX = /^\{\"token\":\"[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\"\}$/;

  describe('POST /api/v1/signup', function() {
    it('responds with status 201', function() {
      return request(app)
        .post('/api/v1/signup')
        .expect(201);
    });

    it('responds with json content', function() {
      return request(app)
        .post('/api/v1/signup')
        .expect('Content-Type', /json/);
    });

    it('responds with a token', function() {
      return request(app)
        .post('/api/v1/signup')
        .expect(JWT_REGEX);
    });

    // responds with status 400/401 for a malformed request, i.e. missing credentials
  });

  describe('POST /api/v1/login', function() {
    it('responds with status 201', function() {
      return request(app)
        .post('/api/v1/login')
        .expect(201);
    });

    it('responds with json content', function() {
      return request(app)
        .post('/api/v1/login')
        .expect('Content-Type', /json/);
    });

    it('responds with a token', function() {
      return request(app)
        .post('/api/v1/login')
        .expect(JWT_REGEX);
    });

    // responds with status 400/401 for a malformed request, i.e. missing credentials
  });
});
