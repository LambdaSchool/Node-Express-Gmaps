const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');
const config = require("./config.js");

const STATUS_SUCCESS = 200;

const key = config.gmaps.apiKey;

const server = express();
server.use(bodyParser.json());

let placeData = null;

server.get('/place', (req, res) => {
  let { query } = req.query;
  query = query.replace(/\s/g, '+');
  let endpoint = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`;

  fetch(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  .then(res => res.json())
  .then(json => json.results[0].place_id)
  .then(place => {
    fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place}&key=${key}`)
      .then(res => res.json())
      .then(json => {
        res.status()
        res.status(STATUS_SUCCESS);
        res.send(json.result);
      })
      .catch(error => {
        console.error('An error ocurred while getting place information: ', error);
      })
    .catch(error => {
      console.error('An error ocurred while getting place information: ', error);
    })
  })
})

server.listen(config.port);
