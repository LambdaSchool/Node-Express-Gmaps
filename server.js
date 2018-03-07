const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const fetch = require("node-fetch");

const config = require("./config.js");
server.use(bodyParser.json());

const PORT = config.port;
const MAP_KEY = config.gmaps.apiKey;

let results;
let mapId;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const url = "https://maps.googleapis.com/maps/api/place";


server.get("/place", (req, res) => {
  const search = req.query.search;
  if (!search) {
    res.send({ STATUS_USER_ERROR: "Input a place" });
    return;
  }
  console.log("Your search is ", search);
  fetch(`${url}/textsearch/json?query=${search}&key=${MAP_KEY}`)
    .then(place => place.json())
    .then(place => {
      console.log(place);
      mapId = place.results[0].place_id;
      res.send(place);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.json({ error: err });
    });
});

let result;

 server.get("/places", (req, res) => {
    
   console.log("second map id", mapId);
   fetch(
     `https://maps.googleapis.com/maps/api/places/details/json?placeid=${mapId}&key=${MAP_KEY}`
     .then(place => place.json())
     .then(place => {
       res.send(place);
     })
     .catch(err => {
       res.send({ STATUS_USER_ERROR: "There was an error" });
     })
 );
});

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port: ${PORT}`);
  }
});
