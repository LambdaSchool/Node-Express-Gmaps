const express = require('express');
const config = require('./config.js');
const fetch = require('node-fetch')

const server = express();

server.listen(config.port);

