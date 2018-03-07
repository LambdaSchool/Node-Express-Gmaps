const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('node-fetch'); 

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

let data = [];

const server = express();
server.use(bodyParser.json());

server.get('/posts', (req, res) => {
  const { search } = req.query;
  res.send();
});

server.fetch('')
	.then(res => res.json())
  .then(json => console.log(json));
