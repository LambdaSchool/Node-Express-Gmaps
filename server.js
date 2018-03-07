const express = require('express');
const request = require('request');
import fetch from 'node-fetch';
const bodyParser = require('body-parser');
const cors = require('cors');

const STATUS_USER_ERROR = 422;

const server = express();
server.use(bodyParser.json());
server.use(cors());

//===================================================================================================
// Create an endpoint `/place` that, provided a query, returns the detailed information about 
// the first place that is in the array of places returned to you from `Place Search`.
//===================================================================================================

server.get('/place', () => {
  request('https://maps.googleapis.com/maps/api/place/textsearch/json?query=', (error, response, body) => {
    res.send(body);
  })
});

server.get('*', (req, res) => {
  res.status(STATUS_USER_ERROR);
  res.send(console.log("Page not found"))
});





server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});