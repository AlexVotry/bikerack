'use strict';

import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));

app.get('/', function(request, response) {
  response.sendFile('index.html');
});

module.exports = app;

