const fetch = require('node-fetch');
const config = require('../../config');

const API_KEY_DISTANCE = config.gmaps.apiKeys.distance;

function getDistance(origin, dest) {
  return new Promise((resolve, reject, transit) => {
    fetch(`http://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${dest}&mode=${transit}&key=${API_KEY_DISTANCE}`)
    .then(dist => dist.json())
    .then(dist => dist.result);
  });

  Promise.all(distance)
    .then (distance => {
      resolve(distance);
    })
    .catch(err => {
      reject(err);
    });
}

module.exports = {
  getDistance
}