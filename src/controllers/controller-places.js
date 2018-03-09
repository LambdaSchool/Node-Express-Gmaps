const express = require('express');
const router = express.Router();
const {
  STATUS_SUCCESS,
  STATUS_USER_ERROR
} = require('../statusCodes')
const {
  getIds,
  getDetails
} = require('../models/model-places.js');

router.get('/place', (req, res) => {
  getIds(req.query.searchTxt)
    .then(ids => [ids[0]])
    .then(getDetails)
    .then(details => {
      res.status(STATUS_SUCCESS);
      res.send( {places: details} );
    })
    .catch(err => {
      console.log(err);
      res.status(STATUS_USER_ERROR);
      res.send( {err: err} );
    });
});

router.get('/places', (req, res) => {
  getIds(req.query.searchTxt)
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

module.exports = router;



