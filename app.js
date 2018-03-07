const fetch = require('node-fetch');
const express = require('express');

const config = require('./config.js');
const server = express();

const key = config.gmaps.apiKey;
const PORT = config.port;

server.get('/place', (req, res) => {
	const term = req.query.term;
  const prom = fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${term}&key=${key}`,
  )
    .then(res => res.json())
    .then(json => json.results[0])
    .then(forId =>
      fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
          forId.place_id
        }&key=${key}`,
      ),
    )
    .then(res => res.json())
    .then(json => res.send(json.result));
});

server.listen(PORT);
