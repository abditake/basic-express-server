'use strict';
const express = require('express');
const app = express();
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const validator = require('./middlerware/validator');
const logger = require('./middlerware/logger');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

app.use(logger);

app.get('/', (req, res) => {

  res.status(200).send('welcome, to see json Data try adding /person followed by query to the url');
});


app.get('/person', validator, (req, res) => {
  let { name } = req.query;
  let object = {
    name: name,
  };
  res.status(200).json(object);
});


app.use('*', notFoundHandler);

app.use(errorHandler);
module.exports = {
  server: app,
  start: () => app.listen(PORT, () => console.log(`Running on port ${PORT}`)),
};