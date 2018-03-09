const express = require('express');
const config = require('../config');
const placesController = require('./controllers/controller-places.js')

const port = config.port;
const server = express();

server.use(placesController);

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port: ${port}`);
});

