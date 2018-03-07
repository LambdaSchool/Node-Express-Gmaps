const bodyParser = require('body-parser');
const express = require('express');
const server = express();


const  config  = require('./config.js');
const PORT = config.port;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const URL_PLACE_SEARCH = '';
const URL_PLACE_DETAILS = '';

const query = 'coffee+shops+in+Austin';

server.use(bodyParser.json());

server.get('/place', (req, res) => {
    const { search } = req.query;
});















server.listen(PORT, err => {
    if (err) {
        console.log(`Error starting server: ${err}`);
    } else {
        console.log(`App listening on port ${PORT}`)
    }
}) 