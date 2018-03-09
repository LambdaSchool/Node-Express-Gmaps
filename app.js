// const fetch = require('node-fetch');
const express = require('express');

const config = require('./config.js');
const placesController = require('./controllers/cplaces.js');
const app = express();

app.use(placesController);

app.listen(3030 , err=>{
  console.log("server works");
});
