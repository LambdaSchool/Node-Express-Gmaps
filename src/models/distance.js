const fetch = require('node-fetch');
const config = require('../../config.js');

const KEY_GMAPS_DISTANCE = config.gmaps.apiKeys.distance;
const URI_DISTANCE_MATRIX = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=';

function getTravelTimes(clientOrigin, clientDestination) {
  return new Promise((resolve, reject) => {
    const travelModes = ['driving', 'walking','bicycling', 'transit'];
    const travelTimes = travelModes.map(mode => {
      const travelTimesUrl = URI_DISTANCE_MATRIX + clientOrigin + '&destinations=' + clientDestination + '&mode=' + mode + '&key=' + KEY_GMAPS_DISTANCE;
      return fetch(travelTimesUrl)
        .then(result => result.json())
        .then(result => {
          result.rows[0].elements[0].mode = mode;
          return result.rows[0].elements[0];
        });
    });

    Promise.all(travelTimes)
      .then(travel_times => {
        resolve(travel_times);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getQuickest(arr) {
  const quickest = arr.reduce((memo, currentObj) => {
    return Math.min(memo.duration.value, currentObj.duration.value) === memo.duration.value ? memo : currentObj;
  });
  return {mode: quickest.mode, duration: quickest.duration.text };
}

module.exports = {
  getTravelTimes,
  getQuickest
};
