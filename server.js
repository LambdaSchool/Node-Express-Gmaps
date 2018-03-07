const express = require('express');
const request = require('request');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config.js');
const STATUS_USER_ERROR = 422;
const KEY = config.gmaps.apiKey;

const server = express();
server.use(bodyParser.json());
server.use(cors());

const PORT = config.port;

//===================================================================================================
// Create an endpoint `/place` that, provided a query, returns the detailed information about 
// the first place that is in the array of places returned to you from `Place Search`.
//===================================================================================================

server.get('/place', (req, res) => {
  const { search } = req.query;
  request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=${KEY}`, (error, response, body) => {

    const parsedResults = JSON.parse(body);

    const { place_id } = parsedResults.results[0];

    request(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${KEY}`, (error, response, body) => {
      res.send(body);
    });
  });
});

//===================================================================================================
// Create an endpoint `/places` that, provided a query returns the detailed information about ALL 
// places returned to you from `Place Search`.
//===================================================================================================

server.get('/places', () => {
  request('', (error, response, body) => {
    res.send(body);
  });
});

// Catch All

server.get('*', (req, res) => {
  res.status(STATUS_USER_ERROR);
  res.send("Page not found");
});

server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});