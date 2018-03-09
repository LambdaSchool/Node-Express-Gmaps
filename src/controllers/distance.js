const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const {
  getTravelTimes,
  getQuickest
} = require('../models/distance.js');

router.get('/travel/mode', (req, res) => {
  getTravelTimes(req.query.origin, req.query.destination)
    .then(getQuickest)
    .then(travel_time => {
      res.status(STATUS_SUCCESS);
      res.send(travel_time);
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send( {error: err} );
    })
})

module.exports = router;
