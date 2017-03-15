'use strict';

import Bike from './bike';
import express from 'express';
import { ObjectID as ObjectId } from 'mongodb';

const bikes = express.Router();

bikes.get('/', (request, response) => {

  const bike = new Bike(request.token.userId);

  bike.all()
    .then(function(bikeList) {
      return response
        .status(200)
        .json({ bikes: bikeList });
    });
});

bikes.post('/', (request, response) => {

  const bike = new Bike(request.token.userId);
  const newBike = request.body.bike;

  if (newBike) {
    // createOne() adds an '_id' field to its argument
    // after the object is added to the database
    bike.createOne(newBike)
      .then(function() {
        return response
          .status(201)
          .json({ bike: newBike });
      });

  } else {
    return response
      .sendStatus(400);
  }
});

// TODO: this is a mess
bikes.put('/', (request, response) => {
  const bike = new Bike(request.token.userId);

  const modification = request.body.bike;

  if (!modification.hasOwnProperty('_id')) return response.sendStatus(400);

  bike.update(modification)
    .then(function(changedBike) {
      return response
        .status(200)
        .json({ bike: changedBike.value });
    })
    .catch(function(error) {
      throw error;
    });
});

bikes.delete('/', (request, response) => {

  const bike = new Bike(request.token.userId);
  const oldBike = request.body.bike;

  if (!oldBike) return response.sendStatus(200);

  bike.drop(oldBike)
    .then(function() {
      return response
        .sendStatus(200);
    });
});

module.exports = bikes;
