const fetch = require("node-fetch");
const config = require("../config.js");

const starterUrl = "https://maps.googleapis.com/maps/api/distancematrix";

const KEY_GMAPS_DISTANCES = config.gmaps.apiKey.distances;


function getDistances(start = "los+angeles", finish = "new+york") {
  return new Promise((resolve, reject) => {
    const URL_DRIVING_DISTANCES = `${starterUrl}/json?origins=` + start + `&destinations=` + finish + `&key=` + KEY_GMAPS_DISTANCES + "&mode=driving";
    console.log(URL_DRIVING_DISTANCES);
    fetch(URL_DRIVING_DISTANCES)
      .then(distances => distances.json())
      .then(distances => {
        resolve(distances.rows);
      })
      .then(ids => {
        resolve(ids);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  getDistances
};
