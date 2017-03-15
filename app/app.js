'use strict';

import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import {signup, login} from './authenticate/authenticate.route';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

app.use('/api/v1/signup', signup);
app.use('/api/v1/login', login);

module.exports = app;
