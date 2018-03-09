const fetch = require('node-fetch');
const express = require('express');
const config = require('../config.js');
const KEY = config.distanceMatrix.apiKey;




function getDistance(destination, origins) {
  return new Promise((resolve, reject) => {
  	const modes = ['driving', 'walking', 'transit', 'bicycling'];
  	let promises = [];
  	modes.forEach((mode) => {
  		promises.push(fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?mode=${mode}&units=imperial&origins=${origins}&destinations=${destination}&key=${KEY}`)
  		.then(res => res.json()));
  	});
  	Promise.all(promises).then((res) => {
  		resolve(res);
  	})
  	.catch(err => {
  		reject(err);
  	});
  });
};

module.exports = {
  getDistance
}