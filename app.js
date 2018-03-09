const express = require('express');
const config = require('./config.js');
const placesController = require('./controllers/');
const distanceController = require('./controllers/distanceController.js');

const app = express();

const PORT = config.port;

app.use(placesController, distanceController);

app.listen(PORT, err => {
  if (err) {
    console.log(`ERROR!, ${err}`);
  } else {
    console.log(`SUCCESS! Server listening on ${PORT}`);
  }
});
