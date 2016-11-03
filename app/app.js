'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.post('/api/v1/signup', function(request, response) {
  let username = request.body.username;

  let user = { user: { name: username, id: 2 } };

  let payload = JSON.stringify(user);
  let encodedPayload = Buffer(payload).toString('base64');

  let token = ['header', encodedPayload, 'signature'].join('.');

  response
    .status(201)
    .json({ token: token });
});

module.exports = app;

