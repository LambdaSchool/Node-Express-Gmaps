const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config.js');

const server = express();
const PORT = config.port;
const API_KEY = config.gmaps.apiKey;

server.use(bodyParser.json());

server.listen(PORT, (err) => {
    if (err) {
        console.log(`There was an error starting the server: ${err}`);
    } else {
        console.log(`Server is listening on port ${PORT}`);
    }
})