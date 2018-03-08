const config = require("./config.js");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const PORT = config.port;
const KEY_PLACE = config.gmaps.apiKey.place_search;
const KEY_DISTANCE = config.gmaps.apiKey.distance_matrix
const PLACE_SEARCH_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
const PLACE_DETAILS_URL = `https://maps.googleapis.com/maps/api/place/details/json?`;

const server = express();
server.use(bodyParser.json());

server.get("/place", (req, res) => {
  let { term } = req.query;
  fetch(`${PLACE_SEARCH_URL}query=${term}&key=${KEY_PLACE}`)
    .then(res => res.json())
    .then(ids => ids.results[0])
    .then((place) => {
      console.log()
      fetch(`${PLACE_DETAILS_URL}placeid=${place.place_id}&key=${KEY_PLACE}`)
        .then(res => res.json())
        .then(json => {
          res.status(200);
          res.send(json);
        });
    })
    .catch(err => {
      console.log(`There was an error: ${err}`);
    });
});

 server.get("/places", (req, res) => {
   const { term } = req.query;

   fetch(`${PLACE_SEARCH_URL}query=${term}&key=${KEY_PLACE}`)
     .then(res => res.json())
     .then(places => {
       placeIds = places.results.map(place => place.place_id);
       promisesArr = placeIds.map(id => {
         return fetch(`${PLACE_DETAILS_URL}placeid=${id}&key=${KEY_PLACE}`)
         .then(details => details.json())
         .then(details => details.result)
         .catch(err => {
           res.status(422);
           res.send({ error: err});
         })
         });
       Promise.all(promisesArr)
         .then(details => {
           res.status(200);
           res.send(details);
       });
     })
     .catch(err => {
       res.status(422);
       res.send({ error: err });
    });
 });


server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
