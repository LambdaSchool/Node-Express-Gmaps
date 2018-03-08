const fetch = require('node-fetch');
const express = require('express');
const config = require('../config.js');
const KEY = config.distanceMatrix.apiKey;




function getDistance(destination, origins) {
  console.log(destination, origins);
  return fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destination}&key=${KEY}`)
  .then(res => res.json())
  .then((res) => {
    return res.rows[0].elements[0].distance.text;
  })

};

module.exports = {
  getDistance
}