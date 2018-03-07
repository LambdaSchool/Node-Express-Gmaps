const express = require('express');
const config = require('./config.js');
const fetch = require('node-fetch')

const server = express();

server.listen(config.port);

// server.get('./', (req, res) => {
//     fetch('https://maps.googleapis.com/maps/api/place/textsearch/json', req.body, {key: config})
//         .then(res => res.json())
//         .then(json => res.send(json));
// })
server.get('/place', (req, res) => {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.location}&key=${config.gmaps.apiKey}`)
        .then(res => res.json())
        .then(json => {
            return res.send(json.results[0]);
        })
        .catch(err => console.error(err));
})

server.get('/places', (req, res) => {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query.location}&key=${config.gmaps.apiKey}`)
        .then(res => res.json())
        .then(json => {
            return res.send(json.results);
        })
        .catch(err => console.error(err));
})
