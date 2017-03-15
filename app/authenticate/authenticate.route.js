'use strict';

import express from 'express';

const login = express.Router();
const signup = express.Router();

signup.post('/', function(request, response) {
  let username = request.body.username;

  let user = { user: { name: username, id: 2 } };

  let payload = JSON.stringify(user);
  let encodedPayload = Buffer(payload).toString('base64');

  let token = ['header', encodedPayload, 'signature'].join('.');

  response
    .status(201)
    .json({ token: token });
});

login.post('/', function(request, response) {
  let username = request.body.username;

  let user = { user: { name: username, id: 2 } };

  let payload = JSON.stringify(user);
  let encodedPayload = Buffer(payload).toString('base64');

  let token = ['header', encodedPayload, 'signature'].join('.');

  response
    .status(201)
    .json({ token: token });
});

module.exports = {
  signup,
  login
};
