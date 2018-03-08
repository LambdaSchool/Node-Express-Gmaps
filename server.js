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
                // console.log(detail);
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
    //return 
})

// server.get(‘/place/id’,(req,res) =>{

//   const placeDetails = req.query;

//   fetch(`https://maps.googleapis.com/maps/api/place/details/json?query=${placeName}&key=${myKey}`)

//   .then(res => res.json())

//   .then(body =>body.results)

//   .catch(err =>{

//       res.status(422);

//       res.send({error:“error occured”});

// });

// })

server.listen(PORT, err => {
    if(err) {
        console.log("There was an error");
    } else {
        console.log(`Server is listening on PORT number ${PORT}`);
    }
});