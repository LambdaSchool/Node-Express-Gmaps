const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const fetch = require("node-fetch");

const config = require("./config.js");
const PORT = config.port;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const URL_PLACE_SEARCH = "";
const URL_PLACE_DETAILS = "";

const query = "coffee+shops+in+Austin";

server.use(bodyParser.json());

server.get("/place", (req, res) => {
  const { search } = req.query;
  const url = URL_PLACE_SEARCH + query;
  
});

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port: ${PORT}`);
  }
});
