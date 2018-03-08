const express = require('express');
const config = require('./config.js');
const placesController = require('./controllers/');

const app = express();

const PORT = config.port;

app.use(placeController);

app.listen(PORT, err => {
  if (err) {
    console.log(`ERROR!, ${err}`);
  } else {
    console.log(`SUCCESS! Server listening on ${PORT}`);
  }
});
