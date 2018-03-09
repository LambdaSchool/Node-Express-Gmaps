const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const fetch = require('node-fetch');

const key = config.gmaps.apiKey;
const matrixKey = config.gMatrix.apiKey;
const PORT = config.port;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;
const results = [];

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
      error: `Can't search for nothing be sure to enter something to search.`
    });
  }
  query = query.split(' ').join('+');
  axios
    .get(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`
    )
    .then(({ data }) => {
      let place_id = data.results[0].place_id;
      axios
        .get(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${key}`
        )
        .then(({ data }) => {
          let url = data.result.url;
          let website = data.result.website;
          let name = data.result.name;
          res.status(STATUS_SUCCESS);
          res.send({ name, url, website });
        })
        .catch((err) => {
          console.log(err);
          res.status(STATUS_USER_ERROR);
          res.send({ err: 'WTF' });
        });
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send({ err });
    });
});

server.get('/places', (req, res) => {
  let { query } = req.query;

  if (!query) {
    res.status(STATUS_USER_ERROR);
    res.send({
      error: `Can't search for nothing be sure to enter something to search.`
    });
  }
  query = query.split(' ').join('+');
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${key}`
  )
    .then((places) => places.json())
    .then((places) => {
      ids = places.results.map((place) => place.place_id);
      details = ids.map((id) => {
        return fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${key}`
        )
          .then((detailed) => detailed.json())
          .then((detailed) => detailed.result);
      });
      Promise.all(details)
        .then((details) => {
          details.forEach((place) => {
            let { name, website, url } = place;
            results.push({ name, website, url });
          });
          res.status(STATUS_SUCCESS);
          res.send({ results });
        })
        .catch((err) => {
          res.status(STATUS_USER_ERROR);
          res.send({ err: 'eesh' });
        });
    });
});

// Postman Query Sameple: localhost:3000//travel/mode?origins=Phoenix+Arizona&destinations=San+Francisco
server.get('/travel/mode', (req, res) => {
  let { query } = req;
  let { origins, destinations } = query;
  origins = origins.split(' ').join('+');
  destinations = destinations.split(' ').join('+');
  let modes = ['driving', 'walking', 'bicycling', 'transit'];
  let durations = [];

  options = modes.map((mode, i) => {
    return fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&mode=${mode}&key=${matrixKey}`
    )
      .then((data) => data.json())
      .then((data) => {
        return { type: mode, duration: data.rows[0].elements[0].duration };
      });
  });
  Promise.all(options)
    .then((options) => {
      options.forEach((option) => {
        let { type, duration } = option;
        durations.push({ type, duration });
      });
      let fastestMode = {
        type: durations[0].type,
        value: durations[0].duration.value
      };
      durations.forEach((mode, i) => {
        if (mode.duration.value < fastestMode.value) {
          Object.assign(fastestMode, {
            type: mode.type,
            value: mode.duration.value
          });
        }
      });
      res.status(STATUS_SUCCESS);
      res.send(fastestMode);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send({ err: 'eesh' });
    });
});

server.listen(PORT);
