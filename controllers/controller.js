const express = require('express');
const router = express.Router();

const {
  getPlaceIDs,
  getDetails
} = require('../models/model');

const STATUS_USER_ERROR = 422;

router.get('/place', (req, res) => {
  const { term } = req.query;
  const searchTerm = term.split(' ').join('+');
  getPlaceIDs(searchTerm)
    .then(ids => [ids[0]])
    .then(getDetails)
    .then(details => res.send(details))
    .catch(err => console.log('There was an error: ', err));
});

router.get('/places', (req, res) => {
  const { term } = req.query;
  const searchTerm = term.split(' ').join('+');
  getPlaceIDs(searchTerm)
    .then(getDetails)
    .then(details => res.send(details))
    .catch(err => console.log('There was an error: ', err));
});

module.exports = router;