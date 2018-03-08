const config = require('./config');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = config.port;
const API_KEY = config.gmaps.apiKey;
const server = express();

const STATUS_SUCCESSFUL = 200;
const STATUS_USER_ERROR = 422;
const detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
const searchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';

server.use(bodyParser.json());

server.get('/place', (req, res) => {

    const search = req.query.search;
        console.log(search);
        const textSearch = searchUrl + search + `&key=${API_KEY}`;
        console.log(textSearch);
    

    fetch(textSearch)
        .then(res => res.json())
        .then(place => {
            
            const results = place.results[0].place_id;
                
                fetch(detailsUrl + results + `&key=${API_KEY}`)
                    .then(res => res.json())
                    .then(details => {
                        res.status(STATUS_SUCCESSFUL);
                        res.send(details);
                    })
                    
                    

         })
        .catch((err) => {
            res.status(STATUS_USER_ERROR);
            res.send({ err });

        });
    })    
server.listen(PORT, (err) => {
    if (err) console.error(err);
    else console.log(`Server is listening on port ${PORT}`);
});