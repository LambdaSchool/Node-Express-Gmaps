const fetch = require('node-fetch');
const config = require('../../config');

const API_KEY_PLACES = config.gmaps.apiKeys.places;

function getIds(query) {
  return new Promise((resolve, reject) => {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${API_KEY_PLACES}`)
      .then(places => places.json())
      .then(places => places.results.map(place => place.place_id))
      .then (ids => {
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
      return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${API_KEY_PLACES}`)
        .then(detailed => detailed.json())
        .then(detailed => detailed.result);
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

module.exports = {
  getIds,
  getDetails
}