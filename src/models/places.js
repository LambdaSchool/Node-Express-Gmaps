const fetch = require('node-fetch');
const config = require('../../config.js');

const KEY_GMAPS_PLACES = config.gmaps.apiKey;
const KEY_GMAPS_DISTANCE = config.gmaps.distanceKey;
const URI_TEXT_SEARCH =
  'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const URI_PLACE_DETAILS =
  'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
const URI_DISTANCE_MATRIX =
  'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial';

const DISTANCE_MODES = ['driving', 'walking', 'bicycling', 'transit'];

// Functions go here
function getIds(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = URI_TEXT_SEARCH + query + '&key=' + KEY_GMAPS_PLACES;
    fetch(searchUrl)
      .then((places) => places.json())
      .then((places) => places.results.map((place) => place.place_id))
      .then((ids) => resolve(ids))
      .catch((err) => reject(err));
  });
}

function getDetails(ids) {
  return new Promise((resolve, reject) => {
    const promises = ids.map((id) => {
      const searchUrl = URI_PLACE_DETAILS + id + '&key=' + KEY_GMAPS_PLACES;
      return fetch(searchUrl)
        .then((details) => details.json())
        .then((details) => details.result);
    });
    Promise.all(promises)
      .then((details) => {
        resolve(details);
      })
      .catch((err) => reject(err));
  }).catch((err) => reject(err));
}

function getDistance(origin, des) {
  return new Promise((resolve, reject) => {
    const modes = DISTANCE_MODES.map((mode) => {
      distanceUrl =
        URI_DISTANCE_MATRIX +
        '&origins=' +
        origin +
        '&destinations=' +
        des +
        '&mode=' +
        mode +
        '&key=' +
        KEY_GMAPS_DISTANCE;
      return fetch(distanceUrl)
        .then((distance) => distance.json())
        .then((distance) => {
      return {
          mode: mode,
          time: distance.rows[0].elements[0].duration.text,
          value: distance.rows[0].elements[0].duration.value,
        }})
    })
    Promise.all(modes)
      .then((distance) => resolve(distance))
      .catch((err) => reject(err));
  }).catch((err) => reject(err));
}

module.exports = {
  getIds,
  getDetails,
  getDistance,
};
