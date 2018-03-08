const fetch = require('node-fetch');
const config = require('../config.js');

const KEY_GMAPS_PLACES = config.gmaps.placesKey;
const KEY_GMAPS_TRAVEL = config.gmaps.travelKey;
const URI_TEXT_SEARCH = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const URI_PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
const URI_TRAVEL_DETAILS = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=';

function getIds(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = URI_TEXT_SEARCH + query + '&key=' + KEY_GMAPS_PLACES;
    fetch(searchUrl)
      .then(places => places.json())
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
      const detailsUrl = URI_PLACE_DETAILS + id + '&key=' + KEY_GMAPS_PLACES;
      return fetch(detailsUrl)
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

function getTravel(origin, destination, mode) {
  return new Promise((resolve, reject) => {
    const travelURL = URI_TRAVEL_DETAILS + origin + '&destinations=' + destination + '&mode=' + mode + '&key=' + KEY_GMAPS_TRAVEL;
    fetch(travelURL)
      .then(details => details.json())
      .then(details => {
        resolve(details.rows[0].elements[0].distance.value);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  getIds,
  getDetails,
  getTravel,
}
