const { PORT, gmaps } = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const server = express();

const STATUS_USER_ERROR = 422;
const API_KEY = gmaps.apiKey;
const SEARCH_REQUEST = 'https://maps.googleapis.com/maps/api/place/textsearch/';
//https://maps.googleapis.com/maps/api/place/textsearch/output?parameters
const DETAILS_REQUEST = 'https://maps.googleapis.com/maps/api/place/details/';
//https://maps.googleapis.com/maps/api/place/details/output?parameters

server.use(bodyParser.json());

// Code here





server.listen(PORT);
