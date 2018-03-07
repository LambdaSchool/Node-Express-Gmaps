const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const server = express();

const PORT = config.port;
const API_KEY = config.gmaps.apiKey;
const STATUS_USER_ERROR = 422;
const SEARCH_REQUEST = 'https://maps.googleapis.com/maps/api/place/textsearch/';
//https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=YOUR_API_KEY
const DETAILS_REQUEST = 'https://maps.googleapis.com/maps/api/place/details/';
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY

server.use(bodyParser.json());

server.get('/place', (req, res) => {
  const { term } = req.query;
  const searchTerm = term.split(' ').join('+');
  fetch(`${SEARCH_REQUEST}json?query=${searchTerm}&key=${API_KEY}`)
    .then(res => res.json())
    .then(listOfPlaces => {
      const id = listOfPlaces.results[0].place_id;
      return fetch(`${DETAILS_REQUEST}json?placeid=${id}&key=${API_KEY}`);
    })
    .then(res => res.json())
    .then(details => res.send(details.result))
    .catch(err => console.log('There was an error: ', err));
});

server.get('/places', (req, res) => {
  const { term } = req.query;
  const searchTerm = term.split(' ').join('+');
  fetch(`${SEARCH_REQUEST}json?query=${searchTerm}&key=${API_KEY}`)
    .then(res => res.json())
    .then(listOfPlaces => {
      const ids = [];
      listOfPlaces.results.forEach(eachResult => ids.push(eachResult.place_id));
      let DetailsPromises = [];
      ids.forEach(eachID => {
        DetailsPromises.push(
          fetch(`${DETAILS_REQUEST}json?placeid=${eachID}&key=${API_KEY}`)
            .then(res => res.json())
        );
      });
      Promise.all(DetailsPromises).then(locationDetails => {
        let displayData = [];
        locationDetails.forEach(eachLocation => {
          displayData.push(eachLocation.result);
        });
        res.send(displayData);
      });
    })
    .catch(err => console.log('There was an error: ', err));
});

server.listen(PORT);
