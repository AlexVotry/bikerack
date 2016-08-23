const express = require('express');
const app = express();

app.get('/', function(request, response) {
  response.sendStatus(200);
});

module.exports = app;

