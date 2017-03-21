'use strict';

import app from './app';
import request from 'supertest-as-promised';

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
});
