const config = require('./config');
const express = require('express');
const placesController = require('./controllers/places.js');

const PORT = config.port;
const server = express();

server.use(placesController);

server.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`Server is listening on port ${PORT}`);
});

// const STATUS_SUCCESSFUL = 200;
// const STATUS_USER_ERROR = 422;
// const placesUrl = 'https://maps.googleapis.com/maps/api/place';
// const API_KEY = config.gmaps.placesApiKey;


// server.get('/place', (req, res) => {
//   const { placeName } = req.query;

//   fetch(`${placesUrl}/textsearch/json?query=${placeName}&key=${API_KEY}`)
//     .then(res => res.json())
//     .then(json => json.results[0].place_id)
//     .then(place => {
//       fetch(`${placesUrl}/details/json?placeid=${place}&key=${API_KEY}`)
//         .then(res => res.json())
//         .then(json => {
//           res.status(STATUS_SUCCESSFUL);
//           res.send(json.result);
//         })
//         .catch(err => {
//           res.status(STATUS_USER_ERROR);
//           res.send({ error: "Error fetching place details" });
//         });
//     })
//     .catch(err => {
//       res.status(STATUS_USER_ERROR);
//       res.send({ error: "Error fetching nearby places" });
//     });
// });



// server.get('/places', (req, res) => {
//   const { placeNames } = req.query;

//   fetch(`${placesUrl}/textsearch/json?query=${placeNames}&key=${API_KEY}`)
//     .then(res => res.json())
//     .then(json => json.results)
//     .then(places => {
//       const promises = [];

//       // Iterating through every place returned and creating new promise then pushing to an array
//       places.forEach(place => {
//         promises.push(new Promise(resolve => {
//           fetch(`${placesUrl}/details/json?placeid=${place.place_id}&key=${API_KEY}`)
//             .then(res => res.json())
//             .then(json => {
//               resolve(json.result);
//             })
//             .catch(err => {
//               res.status(STATUS_USER_ERROR);
//               res.send({ error: "Error fetching place details" });
//             });

//         }));
//         });

//       // Executing every promise in the array and sending the array of resulting data back
//       Promise.all(promises)
//         .then(data => {
//           res.status(STATUS_SUCCESSFUL);
//           res.send(data);
//         });
//       })
//     .catch(err => {
//       res.status(STATUS_USER_ERROR);
//       res.send({ error: "Error fetching nearby places" });
//     });
// });

