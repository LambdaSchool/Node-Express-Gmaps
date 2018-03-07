const config = require('./config.js');
const express = require('express')
const bodyParser = require('body-parser');
const fetch = ('node-fetch');

PORT = config.port;
KEY = config.gmaps.apiKey;

const server = express();
server.use(bodyParser.json());

server.listen(PORT, (err) => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
})