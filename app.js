const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 5000;
const apiKey = require('./config');

app.use(express.json());

app.get('/', (req, res) => {
  const { query: { q } } = req;
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${ q }&key=${ apiKey }`)
    .then(res => res.json())
    .then(json => res.json(json.results[0]))
    .catch(err => res.json(err));
});

app.get('/all', (req, res) => {
  const { query: { q } } = req;
  fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${ q }&key=${ apiKey }`)
    .then(res => res.json())
    .then(json => res.json(json.results))
    .catch(err => res.json(err));
});

app.listen(port, () => console.log(`Server listening on port: ${ port }`));