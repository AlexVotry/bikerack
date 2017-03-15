'use strict';

import app from '../app';
import Bike from './bike';
import Db from '../db';
import { expect } from 'chai';
import fixtures from '../fixtures';
import jwt from 'jsonwebtoken';
import request from 'supertest-as-promised';
import { ObjectID as ObjectId } from 'mongodb';

const _SECRET = 'secret';

describe('module bikes', function() {

  const db = new Db();
  let bike;

  const bikeList = fixtures.bikeList;
  const user = fixtures.userList[2];
  let userBikes = [];

  before(function() {
    bikeList.forEach(function(bicycle) {
      if (bicycle.userId === user.userId) {
        userBikes.push(bicycle);
      }
    });

    return db.connect()
      .then(function() {
        bike = new Bike(user.userId);
        return bike.collection.remove();
      });
  });

  beforeEach(function() {
    return bike.createMany(bikeList);
  });

  describe('GET /api/v1/bikes', function() {

    const authHeader = 'Bearer ' + jwt.sign(user, _SECRET);

    it('responds with status 200', function() {
      return request(app)
        .get('/api/v1/bikes')
        .set('Authorization', authHeader)
        .expect(200);
    });

    it('responds with json content', function() {
      return request(app)
        .get('/api/v1/bikes')
        .set('Authorization', authHeader)
        .expect('Content-Type', /json/);
    });

    it('responds with a list of bikes', function() {
      return request(app)
        .get('/api/v1/bikes')
        .set('Authorization', authHeader)
        .expect(200)
        .then(function(response) {
          expect(response.body.bikes.length).to.be.equal(userBikes.length);
        });
    });

    // responds with status 400/401 for a malformed request, i.e. missing credentials

    it('responds with status 403 when credentials are not included in the request', function() {
      return request(app)
        .get('/api/v1/bikes')
        .expect(403);
    });
  });

  describe('POST /api/v1/bikes', function() {

    const authHeader = 'Bearer ' + jwt.sign(user, _SECRET);

    it('responds with status 201', function() {
      return request(app)
        .post('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({ bike: fixtures.bike })
        .expect(201);
    });

    it('responds with json content', function() {
      return request(app)
        .post('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({ bike: fixtures.bike })
        .expect('Content-type', /json/);
    });

    it('responds with the bike that was posted', function() {
      return request(app)
        .post('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({ bike: fixtures.bike })
        .expect(201)
        .then(function(response) {
          expect(response.body.bike.name).to.equal(fixtures.bike.name);
        });
    });

    it('it saves a bike', function() {
      return request(app)
        .post('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({ bike: fixtures.bike })
        .expect(201)
        .then(function(response) {
          return bike.findOne(fixtures.bike);
        })
        .then(function(found) {
          expect(found.name).to.equal(fixtures.bike.name);
        });
    });

    it('returns same bike when bike already exists', function() {
      return bike.createOne(fixtures.bike)
        .then(function() {
          return request(app)
            .post('/api/v1/bikes')
            .set('authorization', authHeader)
            .send({ bike: fixtures.bike })
            .expect(201)
            .then(function(response) {
              return bike.findOne(fixtures.bike);
              })
              .then(function(found) {
                expect(found).to.deep.equal(fixtures.bike);
              });
        });
    });

    // responds with status 400/401 for a malformed request, i.e. missing bike

    it('responds with status 400 if no bike is posted', function() {
      return request(app)
        .post('/api/v1/bikes')
        .set('authorization', authHeader)
        .expect(400);
    });

    // responds with status 403 when credentials are not included in the request
  });

  describe('PUT /api/vi/bikes', function() {

    const authHeader = 'Bearer ' + jwt.sign(user, _SECRET);

    it('responds with 200', function() {
      return request(app)
        .put('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({  bike: bikeList[0] })
        .expect(200);
    });

    it('responds with JSON content', function() {
      return request(app)
        .put('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({  bike: bikeList[0] })
        .expect('Content-type', /json/);
    });

    it('responds with a bike', function() {
      return request(app)
        .put('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({  bike: bikeList[0] })
        .expect(200)
        .then(function(response) {
          expect(response.body.bike.model).to.be.equal(bikeList[0].model);
        });
    });

    it('updates the bike', function() {
      bikeList[3].name = "bikeZ";
      return request(app)
        .put('/api/v1/bikes')
        .set('authorization', authHeader)
        .send( { bike: bikeList[3] })
        .expect(200)
        .then(function(response) {
          return bike.findOne({ '_id': ObjectId(bikeList[3]['_id']) });
        })
        .then(function(found) {
          expect(found.model).to.be.equal(bikeList[3].model);
        });
    });

    it('creates a new field when one does not exist', function () {
      bikeList[3].size = 'Large';

      return request(app)
        .put('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({ bike: bikeList[3] })
        .expect(200)
        .then(function(response) {
          return bike.findOne({ '_id': ObjectId(bikeList[3]['_id']) });
        })
        .then(function(found) {
          expect(found.size).to.be.equal(bikeList[3].size);
        });
    });

    it('responds with 400 if the modified bike does not include an _id', function() {
      const badBike = bikeList[0];
      delete badBike['_id'];

      return request(app)
        .put('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({ bike: badBike })
        .expect(400);
    });

    it('responds with 400 if the modified bike does not exist', function() {
      const badBike = { name: 'asdoiubdsfbv', model: 'nsvidfubv' };

      return request(app)
        .put('/api/v1/bikes')
        .set('authorization', authHeader)
        .send({ bike: badBike })
        .expect(400);
    });
  });

  describe('DELETE /api/v1/bikes', function() {

    const authHeader = 'Bearer ' + jwt.sign(user, _SECRET);

    it('responds with 200', function() {
      return request(app)
        .delete('/api/v1/bikes')
        .set('authorization', authHeader)
        .expect(200);
    });

    it('responds with 200 when no bike information is supplied (no-op)', function() {
      return request(app)
        .delete('/api/v1/bikes')
        .set('authorization', authHeader)
        .send()
        .expect(200);
    });

    it('deletes the bike', function() {
      return bike.createOne(fixtures.bike)
        .then(function() {
          return request(app)
            .delete('/api/v1/bikes')
            .set('authorization', authHeader)
            .send({ bike: fixtures.bike })
            .expect(200)
            .then(function() {
              return bike.findOne(fixtures.bike);
            })
            .then(function(found) {
              expect(found).to.be.null;
            });
        });
    });

    // responds with status 400/401 for a malformed request, i.e. missing bike
    // responds with status 403 when credentials are not included in the request
  });

  afterEach(function() {
    return bike.collection.remove();
  });

  after(function() {
    return db.close();
  });
});
