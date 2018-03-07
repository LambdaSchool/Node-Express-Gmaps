const fetch = require('node-fetch');

const config = require('./config.js');

const myKey = config.gmaps.apiKey;


console.log(fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Chicago&key=${myKey}`)
    .then(res => res.json())
    .then(body => console.log(json.results.name)));
