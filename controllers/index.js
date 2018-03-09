const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_ERROR = 422;

const { getIds, getDetails } = require('../models/');

router.get('/place', (req, res) => {
  getIds(req.query.textSearch)
    .then(getDetails)
    .then(details => {
      res.status(STATUS_SUCCESS);
      res.send({ places: details });
    })
    .catch(err => {
      res.status(STATUS_ERROR);
      res.send({ err: err });
    });
});

module.exports = router;
