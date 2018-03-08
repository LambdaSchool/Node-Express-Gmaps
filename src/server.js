config = require('../config.js');

const express = require('express');
const bodyParser = require('body-parser');
const server = express();

const PORT = 3030;
const STATUS_SUCCESS = 200; //OK
const STATUS_USER_ERROR = 422; 

// to enable parsing of json bodies for post requests
server.use(bodyParser.json());
let idCounter = 0;

// TODO: your code to handle requests

//create variables to store persistent data 
// empty array to hold place requests
let places = [
  {
    id: null,
    query: "",
    response: "",
    details: "",

  }
];
let placeRequested = null; // stores last user query "coffee+shops+in+Austin"
let placeResponse = null; // stores webserver responses
let placeDetails = null;  // stores details on place

// handle user's query request
server.get("/", (req, res) => {
  if (req.query.placeRequested) {
    let place = null; //declares empty variable for single item 
    Object.keys(SSL_OP_LEGACY_SERVER_CONNECT).forEach((id => {
      if (places[id] === req.query.placeRequested) {
        place = id;
      };
    }));
    res.status(STATUS_SUCCESS);
    res.send(place);
  } else {
    res.status(STATUS_SUCCESS);
    res.send(places);
  }
});


// fetch details on results of users query request
// FETCH SYNTAX
//  https://maps.googleapis.com/maps/api/place/nearbysearch/json?[parameter1]&[param2]&[param3]

 //TELL THE SERVER TO LISTEN TO 'PORT'
 server.listen(PORT,(err) => {
  if(err) {
    console.log('There was an error starting the server: ${err}');
  } else {
    console.log('Server is listening on port ${PORT}');
  }
});