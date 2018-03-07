const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const fetch = require("node-fetch");

const config = require("./config.js");
const PORT = config.port;
const MAP_KEY = config.gmaps.apiKey;

//Put api here
let results;
let mapId;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const URL_PLACE_SEARCH = "";
const URL_PLACE_DETAILS = "";

const query = "coffee+shops+in+Austin";

server.use(bodyParser.json());

server.get("/place", (req, res) => {
  const { search } = req.query;
  if (!search) {
    res.send(STATUS_USER_ERROR);
    return;
  }
  console.log("Your search is ", search);
  fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${search}&key=${MAP_KEY}`
  )
    .then(searches => searches.json())
    .then(searches => {
      console.log(searches);
      mapId = searches.results[0].place_id;
      res.send(searches);
    })
    .catch(err => {
      res.send(STATUS_USER_ERROR);
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
