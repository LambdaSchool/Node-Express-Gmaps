const fetch = require("node-fetch");
const config = require("../config.js");

const KEY_GMAPS_DISTANCES = config.gmaps.apiKey;

const URL_TRAVEL_DISTANCES = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=Seattle&destinations=San+Francisco&key=${KEY_GMAPS_DISTANCES}`;

const starterUrl = "https://maps.googleapis.com/maps/api/distancematrix";

const URL_DRIVING_DISTANCES = `${starterUrl}/json?origins=&destinations=$&key=${KEY_GMAPS_DISTANCES}`;

function getDistances(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = URL_DRIVING_DISTANCES;
    console.log(searchUrl);
    fetch(searchUrl)
      .then(distances => distances.json())
      .then(distances => distances.map(distance => distance.origin_addresses))
      .then(ids => {
        resolve(ids);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  getDistances
};
