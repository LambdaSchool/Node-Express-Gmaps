const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const {
  // Functions are imported here
} = require('../models/places.js');

router.get('/place', (req, res) => {
  getIds(req.param.location)
    .then((ids) => ids[0])
    .then(getDetails)
    .then((details) => {
      res.status(STATUS_SUCCESS);
      res.send({ place: details });
    })
    .catch((err) => {
      res.status(STATUS_USER_ERROR);
      res.send({ err: err });
    });
});

router.get('/places', (req, res) => {});
