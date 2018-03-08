config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const server = express();

const PORT = port;

const API_KEY = gmaps.apiKey;
const DISTANCE_API_KEY = gmaps.distanceApiKey;

const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

server.get('/place', (req, res) => {
  if (req.query.term) {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query}&key=${API_KEY}`).then((data) => {
      return JSON.parse(data)[0];
    })
    .then((placeID) => {
      return fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeID}`)
        .then(data => data);
    })
    .then((details) => {
      res.status(200);
      res.send(details);
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
      return JSON.parse(data);
    })
    .then((placeIDs) => {
      const placeDetailsArr = [], promiseArr = [];
      placeIDs.forEach((id) => {
        const promise = new Promise(resolve, reject);
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${id}`).then(details => {
          placeDetailsArr.push(details);
          promise.resolve();
        });
        promiseArr.push(promise);
      });
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send('Error fetching places.');
    });
    Promise.all(promiseArr).then(() => {
      res.status(200);
      res.json(placeDetailsArr);
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