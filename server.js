const config = require("./config.js");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const PORT = config.port;
const KEY = config.gmaps.apiKey;
const QUERY = "coffee+shops+in+Seattle";
const PLACE_SEARCH_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
const PLACE_DETAILS_URL = `https://maps.googleapis.com/maps/api/place/details/json?`;

const server = express();
server.use(bodyParser.json());

server.get("/place", (req, res) => {
  let { term } = req.query;
  let searchResult = {};
  let placeId = "";
  fetch(`${PLACE_SEARCH_URL}query=${term}&key=${KEY}`)
    .then(res => res.json())
    .then(json => {
      searchResult = json.results[0];
      placeId = searchResult.place_id;
    })
    .then(() => {
      fetch(`${PLACE_DETAILS_URL}placeid=${placeId}&key=${KEY}`)
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
   fetch(`${PLACE_SEARCH_URL}query=${term}&key=${KEY}`)
     .then(res => res.json())
     .then(json => json.results)
     .then(places => {
       const promisesArr = [];
       places.forEach(place => {
         promisesArr.push(
           new Promise(resolve => {
             fetch(`${PLACE_DETAILS_URL}placeid=${place.place_id}&key=${KEY}`)
               .then(res => res.json())
               .then(json => {
                 resolve(json.result);
               })
               .catch(err => {
                 res.status(422);
                 res.send({ error: err });
               });
           })
         );
       });
       Promise.all(promisesArr)
         .then(data => {
           res.status(200);
           res.send(data);
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
