const bodyParser = require("body-parser");
const express = require("express");
const server = express();
const fetch = require("node-fetch");

const config = require("./config.js");
server.use(bodyParser.json());

const PORT = config.port;
const MAP_KEY = config.gmaps.apiKey;

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const url = "https://maps.googleapis.com/maps/api/place";

server.get("/place", (req, res) => {
  const { search } = req.query;
  if (!search) {
    res.send({ STATUS_USER_ERROR: "Input a place" });
    return;
  }
  console.log("Your search is ", search);
  fetch(`${url}/textsearch/json?query=${search}&key=${MAP_KEY}`)
    .then(res => res.json())
    .then(json => json.results[0].place_id)
    .then(place => {
      fetch(`${url}/details/json?placeid=${place}&key=${MAP_KEY}`)
        .then(res => res.json())
        .tbhen(json => {
          res.send({ STATUS_SUCCESS: json.result });
        })
        .catch(err => {
          res.send({ STATUS_USER_ERROR: "Error fetching place" });
        });
    })
    .catch(err => {
      res.send({ STATUS_USER_ERROR: "Error fetching details" });
    });
});

server.get("/places", (req, res) => {
  const { search } = req.query;

  fetch(`${url}/textsearch/json?query=${search}&key=${MAP_KEY}`)
    .then(res => res.json())
    .then(json => json.results)
    .then(places => {
      const promises = [];

      places.forEach(place => {
        promises.push(
          new Promise(resolve => {
            fetch(
              `${url}/details/json?placeid=${place.place_id}&key=${MAP_KEY}`
            )
              .then(res => res.json())
              .then(json => {
                resolve(json.result);
              })
              .catch(err => {
                res.status(STATUS_USER_ERROR);
                res.send({ error: "Error fetching place details" });
              });
          })
        );
      });

      Promise.all(promises).then(data => {
        res.status(STATUS_SUCCESS);
        res.send(data);
      });
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ error: "Error fetching nearby places" });
    });
});

server.get("/places", (req, res) => {
  const { search } = req.query;
  if (!search) {
    res.send({ STATUS_USER_ERROR: "Input a place" });
    return;
  }
  fetch(`${url}/textsearch/json?query=${search}&key=${MAP_KEY}`)
    .then(res => res.json())
    .then(json => {
      const listOfPlaces = json.results.map(result => {
        return fetch(
          `${url}/details/json?placeid=${result.place_id}&key=${MAP_KEY}`
        )
          .then(res => res.json())
          .catch(err => res.send(STATUS_USER_ERROR));
      });
      Promise.all(listOfPlaces).then(response => {
        res.status(STATUS_SUCCESS);
        res.json(response);
      });
    })
    .catch(error => res.send(STATUS_USER_ERROR));
});

server.listen(PORT, err => {
  if (err) {
    console.log(`There was an error: ${err}`);
  } else {
    console.log(`Server is listening on port: ${PORT}`);
  }
});
