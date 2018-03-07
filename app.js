const fetch = require('node-fetch');

const config = require('./config.js');

const key = config.gmaps.apiKey;
const PORT = config.port;

fetch(
  `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=${key}`,
)
  .then(res => res.json())
  .then(json => console.log(json.results[0]));
