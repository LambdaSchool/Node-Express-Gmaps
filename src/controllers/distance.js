const express = require('express');
const router = express.Router();

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const {
  getDistance
} = require('../models/distance.js');

router.get('/travel/mode', (req, res) => {
  getDistance(req.query.search)
    .then(modes => {
      res.status(STATUS_SUCCESS);
      res.send( {results: modes} );
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send( {error: "Error"} );
    });
});

module.exports = router;