const config = require('./config.js');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const server = express();

const PORT = port;

const API_KEY = gmaps.apiKey;
const DISTANCE_API_KEY = gmaps.distanceApiKey;

const STATUS_USER_ERROR = 422;

server.use(bodyParser.json());

server.get('/place', (req, res) => {
  if (req.query.term) {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query}&key=${API_KEY}`).then((data) => {
      return JSON.parse(data)[0];
    })
    .then((placeID) => {
      return fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${placeID}`)
        .then(data => data);
    })
    .then((details) => {
      res.status(200);
      res.json(details);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send('Error fetching places.');
    });
  }
});

server.get('/places', (req, res) => {
  if (req.query.term) {
    fetch(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.query}&key=${API_KEY}`).then((data) => {
      return JSON.parse(data);
    })
    .then((placeIDs) => {
      const placeDetailsArr = [], promiseArr = [];
      placeIDs.forEach((id) => {
        const promise = new Promise(resolve, reject);
        fetch(`https://maps.googleapis.com/maps/api/place/details/json?key=${API_KEY}&placeid=${id}`).then(details => {
          placeDetailsArr.push(details);
          promise.resolve();
        });
        promiseArr.push(promise);
      });
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send('Error fetching places.');
    });
    Promise.all(promiseArr).then(() => {
      res.status(200);
      res.json(placeDetailsArr);
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send('Error fetching places.');
    });
  }

  server.get('/travel/mode', (req, res) => {
    const { origin, destination } = req.params;
    if (!origin || !destination) {
      res.status(STATUS_USER_ERROR);
      res.send('Error: Invalid user data.');
    } else {
      const dataArr = [], promiseArr = [];
      for (let i = 0; i < 4; i++) { promiseArr.push(new Promise(resolve, reject)); }
      fetch(`https://maps.googleapis/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${DISTANCE_API_KEY}&mode=driving`)
        .then((data) => {
          dataArr.push(data);
          promiseArr[0].resolve();
        })
        .catch((err) => {
          res.status(STATUS_USER_ERROR);
          res.send('Error fetching places.');
        });
      fetch(`https://maps.googleapis/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${DISTANCE_API_KEY}&mode=walking`)
        .then((data) => {
          dataArr.push(data);
          promiseArr[1].resolve();
        })
        .catch((err) => {
          res.status(STATUS_USER_ERROR);
          res.send('Error fetching places.');
        });
      fetch(`https://maps.googleapis/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${DISTANCE_API_KEY}&mode=bicycling`)
        .then((data) => {
          dataArr.push(data);
          promiseArr[2].resolve();
        })
        .catch((err) => {
          res.status(STATUS_USER_ERROR);
          res.send('Error fetching places.');
        });
      fetch(`https://maps.googleapis/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${DISTANCE_API_KEY}&mode=transit`)
        .then((data) => {
          dataArr.push(data);
          promiseArr[3].resolve();
        })
        .catch((err) => {
          res.status(STATUS_USER_ERROR);
          res.send('Error fetching places.');
        });
      Promise.all(promiseArr).then(() => {
        const bestModeIndex = dataArr.reduce((bestIndex, mode, currentIndex) => {
          return mode.rows[0].elements[0].duration.value < dataArr[bestIndex].rows[0].elements[0].duration.value ? currentIndex : bestindex;
        }, 0);
        const bestModeTimeText = dataArr[bestModeIndex].rows[0].elements[0].duration.text;
        const bestModeName = ['driving', 'walking', 'bicycling', 'transit'][bestModeIndex];
        const bestTransportation = { mode: bestModeName, time: bestModeTimeText, };
        res.status(200);
        res.json(bestTransportation);
      });
    }
  });
});
