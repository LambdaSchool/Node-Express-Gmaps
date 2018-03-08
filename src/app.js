const express =  require('express');

const config = require('./config.js');
const placesController = require('./controllers/places.js');

const app = express();
const PORT = config.port;

app.use(placesController);

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
