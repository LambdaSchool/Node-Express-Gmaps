const fetch = require("node-fetch");
const config = require("../config.js");

const PORT = config.port;
const KEY_PLACE = config.gmaps.apiKey.place_search;
const KEY_DISTANCE = config.gmaps.apiKey.distance_matrix;
const PLACE_SEARCH_URL =
  "https://maps.googleapis.com/maps/api/place/textsearch/json?";
const PLACE_DETAILS_URL =
  "https://maps.googleapis.com/maps/api/place/details/json?";
const DISTANCE_MATRIX_URL =
  "https://maps.googleapis.com/maps/api/distancematrix/json?&units=imperial&";

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
        .then(details => details.result);
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

function getTravelInfo(origins, destinations) {
  return new Promise((resolve, reject) => {

    const travelModesArr = [];

    travelModesArr.push(
      fetch(
        `${DISTANCE_MATRIX_URL}origins=${origins}&destinations=${destinations}&key=${KEY_DISTANCE}`
      )
        .then(res => res.json())
        .then(travelInfo => {
          return `Driving: ${travelInfo.rows[0].elements[0].duration.value}`
        })
        .catch(err => err)
    );

    travelModesArr.push(
      fetch(
        `${DISTANCE_MATRIX_URL}mode=bicycling&origins=${origins}&destinations=${destinations}&key=${KEY_DISTANCE}`
      )
        .then(res => res.json())
        .then(travelInfo => {
          return `Bicycling: ${travelInfo.rows[0].elements[0].duration.value}`;
        })
        .catch(err => err)
    );

    travelModesArr.push(
      fetch(
        `${DISTANCE_MATRIX_URL}mode=walking&origins=${origins}&destinations=${destinations}&key=${KEY_DISTANCE}`
      )
        .then(res => res.json())
        .then(travelInfo => {
          return `Walking: ${travelInfo.rows[0].elements[0].duration.value}`;
        })
        .catch(err => err)
    );

    travelModesArr.push(
      fetch(
        `${DISTANCE_MATRIX_URL}mode=transit&origins=${origins}&destinations=${destinations}&key=${KEY_DISTANCE}`
      )
        .then(res => res.json())
        .then(travelInfo => {
          return `Transit: ${travelInfo.rows[0].elements[0].duration.value}`;
        })
        .catch(err => err)
    );

    Promise.all(travelModesArr)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });

  });
}

module.exports = { getDetails, getIds, getTravelInfo };
