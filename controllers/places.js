const express = require('express');
const router = express.Router();
const config = require('../config.js');

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const {
  getIds,
  getDetails,
  getDistances,
} = require('../models/places.js');

router.get('/place', (req, res) => {
  const { placeName } = req.query;
  getIds(placeName)
    .then(ids => [ids[0]])
    .then(getDetails)
    .then(json => {
      res.status(STATUS_SUCCESS);
      res.send({ places: json });
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ error: err });
    });
});

router.get('/places', (req, res) => {
  const { placeNames } = req.query;
  getIds(placeNames)
    .then(getDetails)
    .then(json => {
      res.status(STATUS_SUCCESS);
      res.send({ places: json });
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ error: err });
    });
});

router.get('/travel/mode', (req, res) => {
  const { origins, destinations } = req.query;
  getDistances(origins, destinations)
  .then(json => {
    res.status(STATUS_SUCCESS);
    res.send({ distances: json });
  })
  .catch(err => {
    res.status(STATUS_USER_ERROR);
    res.send({ error: err });
  });
});

module.exports = router;