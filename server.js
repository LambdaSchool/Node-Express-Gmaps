const express = require('express');
const { port, gmaps } = require('./config.js');
const fetch = require('node-fetch')

const server = express();

server.listen(port);

