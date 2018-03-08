const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');
const port = config.port;
const server = express();
const API = config.gmaps.apiKey;
const promises = [];

server.use(bodyParser.json());

server.get('/places', (req, res) => {
    const {searchTxt} = req.query;

    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTxt}&key=${API}`)
        .then(res => res.json())
        .then(json => {
            return json.results.map((location) =>{
                let prom = fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${location.place_id}&key=${API}`)
                    .then(response => response.json()).then(json2 => json2);
                promises.push(prom);
                Promise.all(promises).then(function(values) {
                    res.send(values);
                }).catch((err) => {});
            });
        })
});

server.get('/place', (req, res) => {
    const {searchTxt} = req.query;

    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTxt}&key=${API}`)
        .then(res => res.json())
        .then(json => {
            return json.results[0].place_id;
        })
        .then(placeId => {
            fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${API}`)
                .then(res => res.json())
                .then(json => {
                    console.log(json);
                    return res.send(json);
                })
        })

});

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`server is listening on port: ${port}`);
});

