const express = require('express');
const router = express.Router();

const { getTravelDetails } = require('../models/TravelModel');

const STATUS_USER_ERROR = 422;

router.get('/travel/mode', (req, res) => {
  const { origins, destinations } = req.query;
  const searchTerms =
    'origins=' +
    origins.split(' ').join('+') +
    '&destinations=' +
    destinations.split(' ').join('+');
  getTravelDetails(searchTerms)
    .then(response => res.send(response))
    .catch(err => console.log('There was an error: ', err));
});

module.exports = router;