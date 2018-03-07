const fetch = require('node-fetch');

const config = require('./config.js');

const key = config.gmaps.apiKey;
const PORT = config.port;

const prom = fetch(
  `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=${key}`)
  .then(res => res.json())
  .then(json => json.results[0])
  .then( forId => fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?placeid=${forId.place_id}&key=${key}`))
  .then(res => res.json())
  .then(json => console.log(json.result));
  // console.log("this is prom :", prom);

  


// fetch(
//   `https://maps.googleapis.com/maps/api/place/details/json?placeid=${returnedPlaceId}&key=${key}`)
//   .then(res => res.json())
//   .then(json => (json.name));
  // console.log(details);
  
  
  
  



// console.log(result1);
// fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${result1.place_id}&key=${key}`)
// .then(res => res.json())
//   .then(json =>console.log(json));