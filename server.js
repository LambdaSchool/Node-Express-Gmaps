const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch');

const server = express();
const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;
const config = require("./config.js");

const url = 'https://maps.googleapis.com/maps/api/place/';

server.use(bodyParser.json());

server.get("/place", (req, res) => {
  const clientProvided = Object.keys(req.query)[0];

  fetch(`${url}textsearch/json?query=${clientProvided}&key=${config.gmaps.apiKey}`)
    .then(res => res.json())
    .then(json => {
      fetch(`${url}details/json?placeid=${json.results[0].place_id}&key=${config.gmaps.apiKey}`)
      .then(res => res.json())
      .then(json => res.send(json.result))
      .catch(err => res.send(err))
    })
    .catch(err => res.send(err))
})


server.listen(config.port, (err) => {
  if (err) {
    console.log("errror \n" + err);
  } else {
    console.log(`Server is listening on ${config.port}`);
  }
});
