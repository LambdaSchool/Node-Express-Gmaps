const config = require('./config.js');
const express = require('express');
const placesController = require('./controllers/PlacesController');
const travelController = require('./controllers/TravelController');
const server = express();

const PORT = config.port;

server.use(placesController);
server.use(travelController);

server.listen(PORT, err => {
  if (err) console.log('Error starting server: ', err);
  else console.log('Server listening on port: ', PORT);
});
