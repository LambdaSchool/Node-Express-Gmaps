config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const server = express();

const PORT = port;

const API_KEY = gmaps.apiKey;

const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

server.get('/place', (req, res) => {
  if (req.query.term) {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query}&key=${API_KEY}`).then((data) => {
      res.status(200);
      res.json(JSON.parse(data)[0]);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send('Error fetching places.');
    });
  }
});

server.get('/places', (req, res) => {
  if (req.query.term) {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query}&key=${API_KEY}`).then((data) => {
      res.status(200);
      res.send(data);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send('Error fetching places.');
    });
  }
});

server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server listening on port ${PORT}.`);
  }
});