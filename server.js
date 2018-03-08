const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const config = require('./config');
const port = config.port;
const server = express();
const API = config.gmaps.apiKey;

server.use(bodyParser.json());

server.get('/places', (req, res) => {
    const {searchTxt} = req.query;

    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchTxt}&key=${API}`)
        .then(res => res.json())
        .then(json => {
            const promise = json.results.map((location) =>{
                return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${location.place_id}&key=${API}`)
                    .then(resp => resp.json()).then(json => json);
            });
            Promise.all(promise).then(val => res.send(val)).catch(err => console.log(err.message));
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

