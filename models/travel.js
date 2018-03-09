const fetch = require('node-fetch');
const config = require('../config.js');

const URI_TRAVEL_DETAILS = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=';
const KEY_GMAPS_TRAVEL = config.gmaps.travelKey;

const travelTypes = [
  {
    mode: 'driving',
    value: 0,
  },
  {
    mode: 'walking',
    value: 0,
  },
  {
    mode: 'bicycling',
    value: 0,
  },
  {
    mode: 'transit',
    value: 0,
  },
];

const handleData = (data) => {
  let best = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] < best[1]) {
      best = data[i];
    }
  }
  return best;
};

function getTravel(origin, destination) {
  return new Promise((resolve, reject) => {
    const modesMap = travelTypes.map(type => {
      const travelURL = URI_TRAVEL_DETAILS + origin + '&destinations=' + destination + '&mode=' + type.mode + '&key=' + KEY_GMAPS_TRAVEL;
      return fetch(travelURL)
        .then(res => res.json())
        .then(res => res.rows[0].elements[0].distance.value)
        .then(res => [].concat(type.mode, res))
        .catch(err => {
          console.error(err);
          reject(err);
        })
    })
      Promise.all(modesMap)
        .then(modesMap => handleData(modesMap))
        .then(res => resolve(res))
        .catch(err => {
          reject(err);
        });
  });
}

module.exports = {getTravel}
