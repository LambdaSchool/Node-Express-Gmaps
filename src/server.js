const config = require("./config.js");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./controllers/places.js")

const PORT = config.port;

const server = express();
server.use(bodyParser.json());
server.use(router)

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
