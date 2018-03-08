const fetch = require('node-fetch');
const config = require('../../config');

const placesKey = config.gmaps.apiKeys.places;
const textSearchURI = config.gmaps.URIs.places.TEXT_SEARCH;
const placeDetailsURI = config.gmaps.URIs.places.PLACE_DETAILS;

function getIds(searchTxt) {
  return new Promise((resolve, reject) => {
    const searchUrl = textSearchURI + searchTxt + '&key=' + placesKey;
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
      const detailsUrl = placeDetailsURI + id + '&key=' + placesKey;
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

module.exports = {
  getIds,
  getDetails
}