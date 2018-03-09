const fetch = require('node-fetch');
const config = require('../../config.js');

const KEY_GMAPS_PLACES = config.gmaps.apiKeys.places;
const URI_TEXT_SEARCH = config.gmaps.URIs.places.TEXT_SEARCH;
// 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';

const URI_PLACE_DETAILS = config.gmaps.URIs.places.PLACE_DETAILS;
//'https://maps.googleapis.com/maps/api/place/details/json?placeid=';

// Node-Express-Gmaps-Day-I
function getIds(query) {
  return new Promise((resolve, reject) => {
    const searchUrl = URI_TEXT_SEARCH + query + '&key=' + KEY_GMAPS_PLACES;
    fetch(searchUrl)
      .then(places => places.json())
      .then(places => {
        const ids = places.results.map(place => place.place_id);
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

// Node-Express-Gmaps-Day-II
const KEY_GMAPS_DISTANCE = config.gmaps.apiKeys.distance;
const URI_DISTANCE = config.gmaps.URIs.distance.DISTANCE_URL;

// function getTimeMode(query) {
//     // console.log(destinations);
//     return new Promise((resolve, reject) => {
//         const travelUrl = URI_DISTANCE + query;
//         // + '&key=' + KEY_GMAPS_DISTANCE;
//         console.log(travelUrl);
//         fetch(travelUrl)
//         .then(travelInfo => travelInfo.json())
//         .then(travelInfo => {
//             const travelTimeMode = { 
//                 time: travelInfo.rows.elements.duration.value,
//                 mode: query.mode
//             };
//             resolve(travelTimeMode);
//         })
//         .catch(err => {
//             reject(err);
//         });
//     });
// }

function getDistances(origin, destination) {
    const modes = ['bicycling', 'walking', 'driving', 'transit'];
    return new Promise((resolve, reject) => {
        const distances = modes.map(mode => {
            return fetch(`${URI_DISTANCE}${origin}&destinations=${destination}&mode=${mode}&key=${KEY_GMAPS_DISTANCE}`)
                    .then(res => res.json())
                    .then(distance => {
                        return (result = [mode, distance.rows[0].elements[0].duration.text, distance.rows[0].elements[0].duration.value]);})
                    .catch(err => {
                        reject(err);
                    });
                });
        
        Promise.all(distances)
                .then(distances => {
                    distances.sort((a, b) => {
                        return a[2] - b[2];
                    });
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