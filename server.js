const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;
const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const results = [
  {
    city: 'Sidney',
    country: 'Australia',
    phone: 1002003000
  }
];

const server = express();
server.use((req, res, next) => {
  console.log('Request Recieved');
  next();
});
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(STATUS_SUCCESS);
  res.send(results);
});

server.listen(PORT);

