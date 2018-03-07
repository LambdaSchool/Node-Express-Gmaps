const bodyParser = require('body-parser');
const express = require('express');
const nodeFetch = require('node-fetch');

const server = express();
const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;
const config = require("./config.js");

server.use(bodyParser.json());

server.listen(config.port, (err) => {
  if (err) {
    console.log("errror \n" + err);
  } else {
    console.log(`Server is listening on ${config.port}`);
  }
});
