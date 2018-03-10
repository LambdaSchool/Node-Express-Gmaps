const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const server = express();
const port = 3000;

server.get("/", (req, res) => {
    res.send("test");
})

server.get("/place", (req, res) => {
    let name, type, vicinity, locale;
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=34.012467,-118.345911&radius=5&key=AIzaSyA9yeaCJ0L4s48_wATDh_fXg0pMZk8ER44")
    .then(response => response.json())
    .then(data => {
        name = data.results[0].name;
        type = data.results[0].types[0];
        locale = data.results[0].geometry.location.lat + " " + data.results[0].geometry.location.lng;
        vicinity = data.results[0].vicinity;
        res.json(`Name: ${name}; Type of Location: ${type}; Location: ${locale}; Vicinity: ${vicinity}`);
    })
})

module.exports = { server, port };