const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const { getIds, getDetails, getDistance } = require('../models/places.js');

router.get('/place', (req, res) => {
  getIds(req.query.location)
    .then((ids) => [ids[0]])
    .then(getDetails)
    .then((details) => {
      res.status(STATUS_SUCCESS);
      res.send({ place: details });
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send({ err: 'Couldn\'t get the place details' });
    });
});

router.get('/places', (req, res) => {
  getIds(req.query.location)
    .then(getDetails)
    .then((details) => {
      res.status(STATUS_SUCCESS);
      res.send({ places: details });
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send({ err: 'Couldn\'t get details for all results'  });
    });
});

router.get('/travel/mode', (req, res) => {
  const { origin, des } = req.query;
  getDistance(origin, des)
    .then((modes) => modes.reduce())
  //  .then(getDetails)
  //   .then((details) => {
  //     res.status(STATUS_SUCCESS);
  //     res.send({ places: details });
  //   })
  //   .catch((err) => {
  //     res.status(STATUS_USER_ERROR);
  //     res.send({ err: 'Couldn\'t get details for all results'  });
  //   });
});

module.exports = router;
