const config = require('./config.js');
const express = require('express');
const placesController = require('./controllers/controller');
const server = express();

const PORT = config.port;

server.use(placesController);

server.listen(PORT, err => {
  if (err) console.log('Error starting server: ', err);
  else console.log('Server listening on port: ', PORT);
});
