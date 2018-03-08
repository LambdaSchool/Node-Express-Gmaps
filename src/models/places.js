const fetch = require('node-fetch');
const config = require('../../config');

const placesKey = config.gmaps.apiKeys.places;
const textSearchURI = config.gmaps.URIs.places.TEXT_SEARCH;
const placeDetailsURI = config.gmaps.URIs.places.PLACE_DETAILS;

function getIds(searchTxt) {
  console.log('models.places.getids(searchTxt): ', searchTxt);
  return new Promise((resolve, reject) => {
    const searchUrl = textSearchURI + searchTxt + '&key=' + placesKey;
    fetch(searchUrl)
    .then(places => places.json())
    .then(places => {
      // console.log('places: ', places),
      // console.log('places.results: ', places.results),
      // console.log('places.results[0]: ', places.results[0])
      console.log('what is this places.results? ', typeof (places.results));
      places.results[0].map(place => place.place_id)
    })
    .then(ids => {
        console.log('ids: ', ids);
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
        .then(detailed => {
          console.log('detailed: ', detailed);
          return detailed;
        })
        .then(detailed => detailed.result)
    });
    console.log('details: ', details);
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