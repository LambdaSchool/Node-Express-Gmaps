const fetch = require('node-fetch');
const config = require('../config.js');

const iKey = config.gmaps.placesApiKey;
const dKey = config.gmaps.distanceApiKey;

function getIds(query) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${iKey}`,
    )
      .then(res => res.json())
      .then(json => json.results)
      .then(places => places.map(place => place.place_id))
      .then(ids => {
        resolve(ids);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getDetails(ids) {
  return new Promise((resolve, reject) => {
    const details = ids.map(id => {
      return fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${iKey}`,
      )
        .then(res => res.json())
        .then(json => json.result);
    });
    Promise.all(details)
      .then(details => resolve(details))
      .catch(err => reject(err));
  });
}

function getDistance(origin, target) {
  // origin and target are place_ids
  const modes = ['driving', 'bicycling', 'walking', 'transit'];
  const DISTANCE_URI =
    'https://maps.googleapis.com/maps/api/distancematrix/json?';
  const LEAVE_FROM = `origins=${origin}`;
  const REACH = `destinations=${target}`;
  return new Promise((resolve, reject) => {
    const distances = modes.map(mode => {
      return fetch(
        `${DISTANCE_URI}${LEAVE_FROM}&${REACH}&mode=${mode}&key=${dKey}`,
      )
        .then(res => res.json())
        .then(distance => distance.rows[0].elements[0].duration.value);
    });

    Promise.all(distances)
      .then(distances => {
        resolve(distances);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {getIds, getDetails, getDistance};
