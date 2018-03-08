const fetch = require('node-fetch');
const config = require('../../config.js');

const KEY_GMAPS_PLACES = config.gmaps.apiKey;  
const URI_TEXT_SEARCH = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
const URI_PLACE_DETAILS = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

// Functions go here
function getIds(query){
  return new Promise((resolve, reject) => {
    const searchUrl = URI_TEXT_SEARCH + query + '&key=' + KEY_GMAPS_PLACES;
  fetch(searchUrl)
    .then(places => places.json())
    .then((places => places.results.map(place => place.place_id))
      .then(ids => {
        resolve(ids);
      })
      .catch((err) => {
        reject(err);
     });
  );
}


  fetch()
    .then((res) => res.json())
    .then((json) => {
      const promises = json.results.map((result) => {
          return fetch()
            .then((res) => res.json())
            .catch((err) => console.error(err))
      });

      Promise.all(promises)
        .then((responses) => {
          res.status(200);
          res.send(responses);
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
