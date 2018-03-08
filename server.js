const express = require('express');
const config = require('./config.js');
const fetch = require('node-fetch');

const server = express();

server.listen(config.port);

server.get('/place', (req, res) => {
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
      req.query.location
    }&key=${config.gmaps.apiKey}`
  )
    .then((res) => res.json())
    .then((json) => {
      return res.status(200), res.send(json.results[0]);
    })
    .catch((err) => console.error(err));
});

server.get('/places', (req, res) => {
  let promises;
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${
      req.query.location
    }&key=${config.gmaps.apiKey}`
  )
    .then((res) => res.json())
    .then((json) => {
      promises = json.results.map((result) => {
        return fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
            result.id
          }&key=${config.gmaps.apiKey}`
        )
          .then((res) => {
            return res;
          })
          .catch((err) => console.error(err));
      });
    })
    .catch((err) => console.error(err));

  Promise.all(promises)
    .then((responses) => {
      return res.status(200), res.send(responses);
    })
    .catch((err) => console.error(err));
});
