// const fetch = require('node-fetch');
const express = require('express');

const config = require('./config.js');
const placesController = require('./controllers/cplaces.js');
const app = express();
app.use(placesController);
// const server = express();

// const key = config.gmaps.apiKey;
// const PORT = config.port;

// server.get('/place', (req, res) => {
//   const term = req.query.term;
//   fetch(
//     `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${term}&key=${key}`
//   )
//     .then(res => res.json())
//     .then(json => json.results)
//     .then(places => {
//       const detailsPromises = [];
//       places.forEach(place =>
//         detailsPromises.push(
//           fetch(
//             `https://maps.googleapis.com/maps/api/place/details/json?placeid=${
//               place.place_id
//             }&key=${key}`
//           ).then(res => res.json())
//         )
//       );
//       Promise.all(detailsPromises).then(details => {
//         const detailsList = [];
//         details.forEach(each => detailsList.push(each.result));
//         res.send(detailsList);
//       });
//     });
// });

app.listen(3030 , err=>{
  console.log("server works");
});
