const request = require('request');
const fetch = require('node-fetch');
const config = require('../config.js');

const STATUS_USER_ERROR = 422;
const KEY = config.gmaps.apiKey;
const express = require('express');



const router = express.Router();

//==================================================================================================
// IMPORTS
//==================================================================================================

const {
  getDistance
} = require('../models/places.js');

//===================================================================================================
// Create an endpoint `/place` that, provided a query, returns the detailed information about 
// the first place that is in the array of places returned to you from `Place Search`.
//===================================================================================================

router.get('/place', (req, res) => {
  const { search } = req.query;
  request(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=${KEY}`, (error, response, body) => {
    const parsedResults = JSON.parse(body);
    const { place_id } = parsedResults.results[0];
    request(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place_id}&key=${KEY}`, (error, response, body) => {
      res.send(body);
    });
  });
});

//===================================================================================================
// Create an endpoint `/places` that, provided a query returns the detailed information about ALL 
// places returned to you from `Place Search`.
//===================================================================================================

async function fetchDetails(results){
  const details = [];
  for(let i = 0; i < results.length; i++){
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${results[i].place_id}&key=${KEY}`)
    const data = await response.json();
    details.push(data.result);
  }
  return details;
}

router.get('/places', (req, res) => {
  const { search } = req.query;
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=${KEY}`)
  .then(res => res.json())
  .then((places) => { 
    const promise = fetchDetails(places.results);
    promise.then(details => res.send(details));
  })
});

//===================================================================================================
// Distance Matrix
//===================================================================================================


router.get('/travel/mode', (req, res) => {
  const { origins, destination} = req.query;

  getDistance(origins, destination).then((data) => {

    let travelData = [
      {mode: 'walking',
       time: data[1].rows[0].elements[0].duration},
      {mode: 'transit',
       time: data[2].rows[0].elements[0].duration},
      {mode: 'bicycling',
       time: data[3].rows[0].elements[0].duration},
      {mode: 'driving',
       time: data[0].rows[0].elements[0].duration}
    ];

    let quickest = travelData.reduce((prev, current) => {
      return prev.time < current.time ? prev : current;
    });
    console.log(quickest)


    
    res.send(`The quickest mode of transportation is ${quickest.mode}, which takes ${quickest.time.text}.`);
  });
});



// Catch All
router.get('*', (req, res) => {
  res.status(STATUS_USER_ERROR);
  res.send("Page not found");
});

module.exports = router;