config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

const API_KEY = gmaps.apiKey;

server.use(bodyParser.json());

server.listen(PORT);