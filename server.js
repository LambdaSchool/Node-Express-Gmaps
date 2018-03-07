const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const key = config.gmaps.apiKey;
const PORT = 3000;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const resultsId = [];

const server = express();
server.use((req, res, next) => {
  console.log('Request Recieved');
  next();
});
server.use(bodyParser.json());

server.get('/place', (req, res) => {
  let { query } = req.query;
  if (!query) {
    res.status(STATUS_USER_ERROR);
    res.send({
      error: `Can't search for nothing be sure to enter a search term`
    });
  }
  query = query.split(' ').join('+');
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`
    )
    .then(({ data }) => {
      let place_id = data.results[0].place_id;
      resultsId.push(place_id);
      res.status(STATUS_SUCCESS);
      res.send({ place_id });
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send({ err });
    });
});

server.listen(PORT);
