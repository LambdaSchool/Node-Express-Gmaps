const fetch = require('node-fetch');

const config = require('./config.js');

const key = config.gmaps.apiKey;
const PORT = config.port;

const prom = fetch(
  `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=${key}`)
  .then(res => res.json())
  .then(json =>(json.results[0]));
  console.log(prom);
  
const promResolved = Promise.resolve(prom);  
promResolved.then( abc => {
  console.log(abc);
})
// console.log(promResolved);
  
  
  



// console.log(result1);
// fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${result1.place_id}&key=${key}`)
// .then(res => res.json())
//   .then(json =>console.log(json));