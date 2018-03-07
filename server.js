const express = require('express');
const fetch = require('node-fetch');
const config = require('./config.js');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

const PORT = config.port;

server.get('/place', (req, res) => {
  const textSearch = req.query.textSearch;
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${textSearch}&key=${config.gmaps.apiKey}`)
    .then(res => res.json())
    .then(json => res.send(json))
});

server.listen(PORT, err => {
  if (err) {
    console.log(`ERROR!, ${err}`);
  } else {
    console.log(`SUCCESS! Server listening on ${PORT}`);
  }
});
