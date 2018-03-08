const config = require("./config.js");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const PORT = config.port;
const KEY_PLACE = config.gmaps.apiKey.place_search;
const KEY_DISTANCE = config.gmaps.apiKey.distance_matrix
const PLACE_SEARCH_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?`;
const PLACE_DETAILS_URL = `https://maps.googleapis.com/maps/api/place/details/json?`;

const server = express();
server.use(bodyParser.json());

server.get("/place", (req, res) => {
  let { term } = req.query;
  fetch(`${PLACE_SEARCH_URL}query=${term}&key=${KEY_PLACE}`)
    .then(res => res.json())
    .then(ids => ids.results[0])
    .then((place) => {
      fetch(`${PLACE_DETAILS_URL}placeid=${place.place_id}&key=${KEY_PLACE}`)
        .then(res => res.json())
        .then(json => {
          res.status(200);
          res.send(json);
        });
    })
    .catch(err => {
      console.log(`There was an error: ${err}`);
    });
});

function getIds(term) {
  return new Promise((resolve, reject) => {
    fetch(`${PLACE_SEARCH_URL}query=${term}&key=${KEY_PLACE}`)
      .then(res => res.json())
      .then(places => places.results.map(place => place.place_id))
      .then(ids => {
        resolve(ids);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function getDetails(ids) {
  console.log(ids)
  return new Promise((resolve, reject) => {
    const details = ids.map(id => {
      return fetch(`${PLACE_DETAILS_URL}placeid=${id}&key=${KEY_PLACE}`)
        .then(details => details.json())
        .then(details => details.result)
    });

    Promise.all(details)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

server.get("/places", (req, res) => {
  const { term } = req.query;
  getIds(term)
    .then(ids => {
      getDetails(ids)
      .then(details => {
          res.status(200)
          res.send(details)
        })
        .catch(err => {
          res.status(422)
          res.send({ error: 'Error in the /places request' })
        })
    })
})


server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port ${PORT}`);
  }
});
