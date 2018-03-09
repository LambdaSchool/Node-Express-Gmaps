const express = require('express');
const router = express.Router();
const {getIds, getDetails, getDistance} = require('../models/mplaces.js');

router.get('/place', (req, res) => {
  getIds(req.query.term)
    .then(ids => [ids[0]])
    .then(getDetails)
    .then(answer => res.send(answer))
    .catch(err => res.send('this is the error for /place'));
});

router.get('/places', (req, res) => {
  getIds(req.query.term)
    .then(getDetails)
    .then(answer => res.send(answer))
    .catch(err => res.send('this is the error for /places'));
});

router.get('/travel/mode', (req, res) => {
  getDistance(req.query.origin, req.query.target)
    .then(distances => {
      return distances.reduce(
        (shortest, current) => (current < shortest ? current : shortest),
      );
    })
    .then(minDist => res.send({shortestDistance: minDist}))
    .catch(err => res.send("apprently there's an error"));
});

module.exports = router;
