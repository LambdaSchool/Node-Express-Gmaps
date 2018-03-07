const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const config = require("./config.js");

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

// let data = [];
const key = config.gmaps.apiKey;

const server = express();
server.use(bodyParser.json());

server.get('/place', (req, res) => {
  let { query } = req.query;
  query = query.replace(/\s/g, '+');
  let endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`;
  fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => console.log(data.results[0]));
  res.status(STATUS_SUCCESS);
  res.send({ result: 'success' });
});

server.listen(config.port);
