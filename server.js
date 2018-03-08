const express = require('express');
const server = express();
const config = require('./config.js');
const PORT = config.port;
const controller = require('./controllers/places.js')
const bodyParser = require('body-parser');
const cors = require('cors');

server.use(controller);
server.use(bodyParser.json());
server.use(cors());

server.listen(3030, (err) => {
  if (err) {
    console.log(`There was an error starting the server: ${err}`);
  }
  else {
    console.log(`Server is listening on port ${PORT}`)
  }
});