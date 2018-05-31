const express = require("express");
const config = require("./config.js");
const controllers = require("./controllers/travel-distance.js");
const server = express();
const PORT = config.port;
const bodyParser = require('body-parser')
server.use(controllers);


server.use(bodyParser.json())

server.listen(PORT, err => {
  if (err) {
    console.log(`Error starting on server: ${err}`);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});
