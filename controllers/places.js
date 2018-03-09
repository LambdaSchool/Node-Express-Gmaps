const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const {
  getIds,
  getDetails,
} = require('../models/places.js');
const { getTravel } = require('../models/travel.js')

router.get('/place', (req, res) => {
  getIds(req.query.search)
    .then(ids => [ids[0]])
    .then(getDetails)
    .then(details => {
      res.status(STATUS_SUCCESS);
      console.log(details);
      res.send( {places: details} );
    })
    .catch(err => {
      console.log(err);
      res.status(STATUS_USER_ERROR);
      res.send( {err: err} );
    });
});

router.get('/places', (req, res) => {
  getIds(req.query.search)
    .then(getDetails)
    .then(details => {
      res.status(STATUS_SUCCESS);
      res.send( {places: details} );
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send( {err: err} );
    });
});

router.get('/travel/mode', (req, res) => {
  const { origin, destination } = req.query;
  getTravel(origin, destination)
    .then(details => {
      console.log(details);
      res.status(STATUS_SUCCESS);
      res.send( {results: details} );
    })
    .catch(err => {
      console.error(err);
      res.status(STATUS_USER_ERROR);
      res.send( {error: err} );
    });
});

module.exports = router;
