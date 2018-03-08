const config = require("./config.js");
const fetch = require("node-fetch");
const express = require("express");
const bodyParser = require("body-parser");

const server = express();

const PORT = config.port;
const API_KEY = config.gmaps.apiKey;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;
const URL = "https://maps.googleapis.com/maps/api/place";

server.use(bodyParser.json());

server.get("/place", (req, res) => {
  const { term } = req.query;
  fetch(`${URL}/textsearch/json?query=${term}&key=${API_KEY}`)
    .then(res => res.json())
    .then(json => json.results[0].place_id)
    .then(place => {
      fetch(`${URL}/details/json?placeid=${place}&key${API_KEY}`)
        .then(res => res.json())
        .then(json => {
          res.status(STATUS_SUCCESS);
          res.send(json.result);
        })
        .catch(err => {
          res.status(STATUS_USER_ERROR);
          res.json({ error: "Error fectching details." });
        });
    })

    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.json({ error: "Error fetching places." });
    });
});

server.listen(PORT);
