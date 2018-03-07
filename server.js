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
    // console.log(data);
  })
  .catch(error => {
    console.log('An error ocurred');
  });
  res.status(STATUS_SUCCESS);
  res.send({ result: 'success' });
})

const getPlaceInfo = (id) => {
  let nextEndpoint = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${key}`;
    // let test = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJf2bcOEwEzkwRIlC5c4aa4KM&key=AIzaSyCxJadB2xe5nmWQNqZgmNzT-vpsYa-FHEY';
  fetch(nextEndpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}

server.listen(config.port);
