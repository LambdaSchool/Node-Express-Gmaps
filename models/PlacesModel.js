const fetch = require('node-fetch');
const config = require('../config');

const API_KEY = config.gmaps.PlacesAPIKey;
const STATUS_USER_ERROR = 422;
const SEARCH_REQUEST = 'https://maps.googleapis.com/maps/api/place/textsearch/';
//https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=YOUR_API_KEY
const DETAILS_REQUEST = 'https://maps.googleapis.com/maps/api/place/details/';
//https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY

const getPlaceIDs = searchTerm => {
  return new Promise((resolve, reject) => {
    fetch(`${SEARCH_REQUEST}json?query=${searchTerm}&key=${API_KEY}`)
      .then(res => res.json())
      .then(places => places.results.map(place => place.place_id))
      .then(ids => resolve(ids))
      .catch(err => reject(err));
  });
};

const getDetails = ids => {
  return new Promise((resolve, reject) => {
    let details = [];
    ids.forEach(eachID => {
      details.push(
        fetch(`${DETAILS_REQUEST}json?placeid=${eachID}&key=${API_KEY}`)
          .then(details => details.json())
          .then(details => details.result)
      );
    });

    Promise.all(details)
      .then(details => {
        resolve(details);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  getPlaceIDs,
  getDetails,
};
