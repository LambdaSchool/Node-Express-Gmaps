const fetch = require('node-fetch');
const config = require('../../config.js');

const KEY_GMAPS_PLACES = config.gmaps.apiKey;
const URI_TEXT_SEARCH =
  'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const URI_PLACE_DETAILS =
  'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

// Functions go here
function getIds(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = URI_TEXT_SEARCH + query + '&key=' + KEY_GMAPS_PLACES;
    fetch(searchUrl)
      .then((places) => places.json())
      .then(
        ((places) => places.results.map((place) => place.place_id))
          .then((ids) => {
            resolve(ids);
          })
          .catch((err) => {
            reject(err);
          })
      );
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
  }).catch((err) => console.error(err));
}
