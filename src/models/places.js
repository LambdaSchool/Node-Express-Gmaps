const fetch = require('node-fetch');
const config = require('../config.js');

const PORT = config.port;
const KEY_PLACE = config.gmaps.apiKey.place_search;
const KEY_DISTANCE = config.gmaps.apiKey.distance_matrix
const PLACE_SEARCH_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
const PLACE_DETAILS_URL = `https://maps.googleapis.com/maps/api/place/details/json?`;

function getIds(term) {
  return new Promise((resolve, reject) => {
    fetch(`${PLACE_SEARCH_URL}query=${term}&key=${KEY_PLACE}`)
      .then(res => res.json())
      .then(places => places.results.map(place => place.place_id))
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
      return fetch(`${PLACE_DETAILS_URL}placeid=${id}&key=${KEY_PLACE}`)
        .then(details => details.json())
        .then(details => details.result)
    });

    Promise.all(details)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = { getDetails, getIds }