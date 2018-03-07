const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const config = require('./config.js');

const PORT = config.port;
const API_KEY = config.gmaps.apiKey;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const server = express();
server.use(bodyParser.json());
// server.use(cors());

const sendUserError = (msg, res) => {
  res.status(STATUS_USER_ERROR).json({ error: msg });
  return;
};

server.get('/places', (req, res) => {
  const {
    searchName
  } = req.query;

  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchName}&key=${API_KEY}`)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => {
    res.status(STATUS_USER_ERROR).send(sendUserError('Error fetching data'));
  });

});

server.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});