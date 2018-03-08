const fetch = require('node-fetch');
const config = require('../config.js');

const KEY_GMAPS_PLACES = config.gmaps.placesApiKey;
const KEY_GMAPS_TRAVEL = config.gmaps.travelApiKey;
const URL_TEXT_SEARCH = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const URL_PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
const URL_TRAVEL_MODE = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=';

function getIds(query) {
  return new Promise((resolve, reject) => {
    fetch(`${URL_TEXT_SEARCH}${query}&key=${KEY_GMAPS_PLACES}`)
      .then(res => res.json())
      .then(json => json.results.map(place => place.place_id))
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
      return fetch(`${URL_PLACE_DETAILS}${id}&key=${KEY_GMAPS_PLACES}`)
        .then(res => res.json())
        .then(json => json.result)
    });

    Promise.all(details)
      .then(details => {
        resolve(details);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getDistances(origin, destination) {
  const modes = ['bicycling', 'walking', 'driving', 'transit'];
  return new Promise((resolve, reject) => {
    const distances = modes.map(mode => {
      return fetch(`${URL_TRAVEL_MODE}${origin}&destinations=${destination}&mode=${mode}&key=${KEY_GMAPS_TRAVEL}`)
        .then(res => res.json())
        .then(distance => {
          return result = [ mode, distance.rows[0].elements[0].duration.text, distance.rows[0].elements[0].duration.value ];
        })
        .catch(err => {
          reject(err);
        })
    });

    Promise.all(distances)
      .then(distances => {
        console.log('initial distances is', distances);
        distances.sort((a, b) => {
          return a[2] - b[2];
        })
        console.log('sorted distances is', distances);
        const shortestMode = distances[0][0];
        const shortestTime = distances[0][1];

        resolve(`${shortestMode} is the quickest method at ${shortestTime}, from ${origin} to ${destination}.`);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  getIds,
  getDetails,
  getDistances,
}