const express = require('express');
const router = express.Router();
const { getIds, getDetails } = require('../models/mplaces.js');


router.get('/place', (req, res) => {
  getIds(req.query.term)
  .then(ids => [ids[0]])
  .then(getDetails)
  .then(answer => res.send(answer))
  .catch(err => res.send("this is the error for /place"));
});

router.get('/places', (req, res) => {
  getIds(req.query.term)
  .then(getDetails)
  .then(answer => res.send(answer))
  .catch(err => res.send("this is the error for /places"));
});

module.exports = router;