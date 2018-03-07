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
    .then(json => console.log(json))
})


server.listen(config.port, (err) => {
  if (err) {
    console.log("errror \n" + err);
  } else {
    console.log(`Server is listening on ${config.port}`);
  }
});
