config = require("./config.js");
const express = require('express');
const fetch = require('fetch');
const bodyParser = require('body-parser');
const STATUS_SUCCESS = 200; //OK
const STATUS_USER_ERROR = 422; 

const server = express();

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
let queryInput = null; // stores last user query "coffee+shops+in+Austin"
let placeResponse = null; // stores webserver responses
let placeDetails = null;  // stores details on place

// handle user's query request



// fetch details on results of users query request
// FETCH SYNTAX


