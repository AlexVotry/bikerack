'use strict';

import express from 'express';

import auth from './authenticate';

const login = express.Router();
const signup = express.Router();

signup.post('/', function(request, response) {
  let credentials = request.body.credentials;

  auth.register(credentials).then(function(token) {
    response
      .status(201)
      .json({ token: token });
  });
});

login.post('/', function(request, response) {
  let credentials = request.body.credentials;

  auth.verify(credentials).then(function(token) {
    response
      .status(201)
      .json({ token: token });
  });
});

module.exports = {
  signup,
  login
};
