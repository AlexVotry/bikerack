'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import auth from './authenticate/authenticate';
import {signup, login} from './authenticate/authenticate.route';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.use('/api/v1/signup', signup);
app.use('/api/v1/login', login);

// protect all routes except /, ~/signup,  and ~/login
app.use(function(request, response, next) {

  if (request.path == '/' || request.path == '/api/v1/signup' || request.path == '/api/v1/login') next();

  try {
    auth.authenticateJWT(request);
    next();
  } catch(error) {
    response.sendStatus(403);
  }
});

module.exports = app;
