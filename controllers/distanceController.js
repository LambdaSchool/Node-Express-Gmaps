const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_ERROR = 422;

const { getDistance } = require('../models/distanceModel.js');

router.get('/travel/mode', (req, res) => {
  getDistance('New+York+NY', 'Los+Angeles+CA')
    .then(distanceResults => {
      res.status(STATUS_SUCCESS);
      res.send({ distance: distanceResults });
    })
    .catch(err => {
      res.status(STATUS_ERROR);
      res.send({ err: err });
    });
});

module.exports = router;
