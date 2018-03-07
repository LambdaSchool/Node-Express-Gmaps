const config = require('./config');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = config.port;
const API_KEY = config.gmaps.apiKey;
const server = express();

const STATUS_SUCCESSFUL = 200;
const STATUS_USER_ERROR = 422;
const url = 'https://maps.googleapis.com/maps/api/place';

server.use(bodyParser.json());

server.get('/place', (req, res) => {
<<<<<<< HEAD

});
=======
    const { place } 
})
>>>>>>> df65725e283098d7dfd37597c7f4810ccb13373a

server.listen(PORT, (err) => {
    if (err) console.error(err);
    else console.log(`Server is listening on port ${PORT}`);
});