const fetch = require("node-fetch");
const config = require("../config.js");



let starterUrl = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=";

const KEY_GMAPS_DISTANCES = config.gmaps.apiKey;



function getDistances(start, finish, mode) {
  return new Promise((resolve, reject) => {
    let urlDriving = starterUrl + start + "&destinations=" + finish + "&key=" + KEY_GMAPS_DISTANCES + "&mode=" + mode;
    console.log(urlDriving)
    return fetch(urlDriving)
      .then(distances => distances.json())
      .then(distances => {
        resolve(distances.rows);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  getDistances
};




//https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&key=YOUR_API_KEY