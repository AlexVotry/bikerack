var request = require('supertest-as-promised');
var app = require('../app/app');

describe('module app', function() {
  describe('GET /', function() {
    it('responds with status 200', function() {
      return request(app)
        .get('/')
        .expect(200);
    });
  });
});

