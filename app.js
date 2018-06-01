const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 5000;
const apiKey = require('./config');

app.use(express.json());

// error handler
const error = (res, statusCode, message) => {
  res.status(statusCode).json({ error: message });
}

/*************************
** CUSTOM MIDDLEWARE **
*************************/
// fetchResults
const fetchResults = (req, res) => {
  const { path } = req.route;
  const { q: query } = req.query;
  const queryString = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${ query }&key=${ apiKey }`;
  fetch(queryString)
    .then(res => res.json())
    .then(json => {
      if (json.results.length === 0) {
        return error(res, 404, `Your search for "${ query }" returned zero results. Try a more specific search next time.`);
      }
      (path === '/') ? res.json(json.results[0]) : res.json(json.results);
    })
    .catch(err => res.json(err));
}

/*************************
** ROUTES **
*************************/
// GET: /
app.get('/', fetchResults);

// GET: /all
app.get('/all', fetchResults);

app.listen(port, () => console.log(`Server listening on port: ${ port }`));