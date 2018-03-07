const config = require('./config');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = config.port;
const API_KEY = config.gmaps.apiKey;
const server = express();

const STATUS_SUCCESSFUL = 200;
const STATUS_USER_ERROR = 422;
const url = 'https://maps.googleapis.com/maps/api/place';

server.use(bodyParser.json());

server.get('/place', (req, res) => {

});

server.listen(PORT, (err) => {
    if (err) console.error(err);
    else console.log(`Server is listening on port ${PORT}`);
});