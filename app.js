const express = require('express');
const fetch = require('node-fetch');
const config = require('./config.js');

const server = express();


const PORT = config.port;

app.use();


app.listen(PORT, err => {
  if (err) {
    console.log(`ERROR!, ${err}`);
  } else {
    console.log(`SUCCESS! Server listening on ${PORT}`);
  }
});
