const express = require('express');

const config = require('../config.js');
const distanceController = require('./controllers/distance.js');

const app = express();
const PORT = config.port;

app.use(distanceController);

app.listen(PORT, err => {
  if (err) {
    console.error('Error starting server:', err);
  } else {
    console.log('App listening on port:', PORT);
  }
});
