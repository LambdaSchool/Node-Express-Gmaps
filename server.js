const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const fetch = require("node-fetch");

const config = require("./config.js");
server.use(bodyParser.json());

const PORT = config.port;
const MAP_KEY = config.gmaps.apiKey;

//Put api here
let results;
let mapId;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

server.get("/place", (req, res) => {
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=${MAP_KEY}`
  )
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

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port: ${PORT}`);
  }
});
