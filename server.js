const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const config = require("./config.js");

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const key = config.gmaps.apiKey;

const server = express();
server.use(bodyParser.json());

server.get('/place', (req, res) => {
  let id = null;
  let { query } = req.query;
  query = query.replace(/\s/g, '+');
  let endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`;
  fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(data => {
    id = data.results[0].place_id;
    getPlaceInfo(id);
  })
  .catch(error => {
    console.log('An error ocurred while getting query return');
  });
  res.status(STATUS_SUCCESS);
  res.send({ result: 'success' });
})

const getPlaceInfo = (id) => {
  let nextEndpoint = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${key}`;
  fetch(nextEndpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.log('An error ocurred while getting place information');
    });
}

server.listen(config.port);
