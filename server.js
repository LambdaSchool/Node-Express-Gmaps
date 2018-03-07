const express = require('express');
const { PORT, GMAPS } = require('./config.js');
const fetch = require('node-fetch')

const server = express();

server.listen(PORT);

