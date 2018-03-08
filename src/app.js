const express =  require('express');

const config = require('../config');
const placesController = require('./controllers/places.js');
const distanceController = require('./controllers/distance.js');

const app = express();
const PORT = config.port;

app.use(placesController);
app.use(distanceController);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
