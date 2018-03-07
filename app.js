/**
   app.js
   ======
   BACKEND SERVER HITTING GOOGLE MAPS PLACE API
   --------------------------------------------------
   Version 0.1 2018-03-07T10:27:14
   ..................................................
   - Initial commit
   __________________________________________________
 */

const express = require('express');

const { PORT, gmaps } = require('./config');
const APIKEY = gmaps.apiKey;

const app = express();



app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT} ...`);
});
