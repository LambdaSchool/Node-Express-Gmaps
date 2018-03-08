const bodyParser = require('body-parser');
const express = require('express');
const STATUS_SUCCESS = 200; //OK
const STATUS_USER_ERROR = 422; //Unprocessable Entity
let key = 'AIzaSyC3nbXBLuAIwFYYqgQHO6lRTJr4mOCFmT0';
let radius = 5000;
let https = require('https');
const server = express();
server.use(bodyParser.json());
server.get("/", (req, res) => {
    res.send("hello Wordd");
});
server.get("/place/", (req, res) => {
    let str = req.query.search; // "coffee+shop+Austin"

    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + str + '&key=' + key;
    console.log(url);
    https.get(url, function(response) {

        console.log("got something");
        let body = '';
        response.on('data', function(chunk) {

            body += chunk;
        });
        response.on('end', function() {

            let places = JSON.parse(body);
            let locations = places.results;
            let firstLoc = locations[0];
            res.json(firstLoc);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});
server.get("/places/", (req, res) => {
    let str = req.query.search; // "coffee+shop+Austin"

    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + str + '&key=' + key;
    console.log(url);
    https.get(url, function(response) {
        console.log("got something");
        let body = '';
        response.on('data', function(chunk) {
            body += chunk;
        });
        response.on('end', function() {
            let places = JSON.parse(body);
            let locations = places.results;
            let firstLoc = locations[0];
            res.json(locations);
        });
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
    });
});
server.listen(3000);