const config = require('./config.js');
const express = require('express')
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

PORT = config.port;
KEY = config.gmaps.apiKey;
QUERY = 'coffee+shops+in+Brooklyn'
MAPS_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${QUERY}&key=${KEY}`


const server = express();
server.use(bodyParser.json());

let searchResult = {}

fetch(MAPS_URL)
	.then(res => res.json())
  .then(json => {
    searchResult = json;
    console.log(searchResult);
  })

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
})