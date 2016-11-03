var app = require('../app/app');
var request = require('supertest-as-promised');

describe('module app', function() {

  describe('GET /', function() {
    it('responds with status 200', function() {
      return request(app)
        .get('/')
        .expect(200);
    });

    it('responds with html content', function() {
      return request(app)
        .get('/')
        .expect('Content-Type', /html/);
    });
  });

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
      const JWT_REGEX = /^\{\"token\":\"[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\.[\w\-\+\~\/]+\=*\"\}$/;

      return request(app)
        .post('/api/v1/signup')
        .expect(JWT_REGEX);
    });

    // responds with status 400/401 for a malformed request, i.e. missing credentials
  });

});

