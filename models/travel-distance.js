const fetch = require('node-fetch');
const config = require('../config.js');

const KEY_GMAPS_DISTANCES = config.gmaps.apiKey.distances;

const URL_TRAVEL_DISTANCES = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=${KEY_GMAPS_DISTANCES}`

function getDistances(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = URL_TRAVEL_DISTANCES;
    console.log(searchUrl);
    fetch(searchUrl)
      .then(distances => distances.json())
      .then(distances => distances.results.map(distance => distance.distance_id))
      .then(ids => {
        resolve(ids);
      })
      .catch(err =>  {
        reject(err);
      });
  });
}

module.exports = {
  getDistances
}