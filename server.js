const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.js');

const myKey = config.gmaps.apiKey;
const PORT = config.port;

const server = express();

server.use(bodyParser.json());

server.get('/place',(req,res) =>{
    const placeName = req.query.search;
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&key=${myKey}`)
    .then(res => res.json())
    .then(place => {
            fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${place.results[0].place_id}&key=${myKey}`)
            .then(res => res.json())
            .then(detail => {
            
                res.status(200);
                res.send({detail});
            })

            .catch(err => {
                res.status(422);
                res.send({error:"error occured on detail"});
            } )
    })
    .catch(err =>{
        res.status(422);
        res.send({error:"error occured"});
});
    
})

server.get('/places',(req,res) => {
  const placeNames = req.query.search;
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeNames}&key=${myKey}`)
  .then(res => res.json())
  .then(places => { // got places object.
    console.log(places);
     const placeIds = places.results.map(place => place.place_id);
     const details = placeIds.map(id => {
      return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${id}&key=${myKey}`)
        .then(detailed => detailed.json())
        .then(detailed => detailed.result);
})
     Promise.all(details) 
     .then(details => {
      res.status(200);
      res.send({places: details})
     })
     .catch(err =>{
        res.status(422);
        res.send({error:"error occured"});
    })
})
  .catch(err =>{
        res.status(422);
        res.send({error:"error occured"});
})
})

server.listen(PORT, err => {
    if(err) {
        console.log("There was an error");
    } else {
        console.log(`Server is listening on PORT number ${PORT}`);
    }
})