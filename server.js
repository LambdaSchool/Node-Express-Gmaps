const controller = require('./controller.js');
const express = require('express');
const server = express();

server.use(controller);

server.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server listening on port ${PORT}.`);
  }
});