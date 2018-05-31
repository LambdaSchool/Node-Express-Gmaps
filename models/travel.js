const fetch = require('node-fetch');
const config = require('../config.js');

const URI_TRAVEL_DETAILS = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=';
const KEY_GMAPS_TRAVEL = config.gmaps.travelKey;

const travelTypes = [
  {
    mode: 'driving',
  },
  {
    mode: 'walking',
  },
  {
    mode: 'bicycling',
  },
  {
    mode: 'transit',
  },
];

const handleData = (data) => {
  let best = data[0];
  for (let i = 1; i < data.length; i++) {
    if (data[i].time < best.time) {
      best = data[i];
    }
  }
  return best;
};

const getTime = (data) => {
  return `${Math.floor(data / 3600)} hours, ${(data % 3600) / 60} minutes`;
};

function getTravel(origin, destination) {
  return new Promise((resolve, reject) => {
    const modesMap = travelTypes.map(type => {
      const travelURL = URI_TRAVEL_DETAILS + origin + '&destinations=' + destination + '&mode=' + type.mode + '&key=' + KEY_GMAPS_TRAVEL;
      return fetch(travelURL)
        .then(res => res.json())
        .then(res => res.rows[0].elements[0].duration.value)
        .then(res => [].concat({ origin: origin, destination: destination, method: type.mode, time: getTime(res) }))
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
