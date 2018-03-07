const express  = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch')
const config = require('./config');

const port = 3000;
const server = express();
const API = config.gmaps.apiKey

server.use(bodyParser.json());

server.get('/place', (req, res) => {
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=${API}`)
    .then(res => res.json())
    .then(json => console.log(json));
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});

