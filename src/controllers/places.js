const express = require('express');
const router = express.Router();

const { getDetails, getIds } = require('../models/places.js')

router.get("/places", (req, res) => {
  const { term } = req.query;
  getIds(term)
    .then(ids => {
      getDetails(ids)
      .then(details => {
          res.status(200)
          res.send(details)
        })
        .catch(err => {
          res.status(422)
          res.send({ error: 'Error in the /places request' })
        })
    })
})

router.get("/place", (req, res) => {
  const { term } = req.query;
  getIds(term)
    .then(ids => {
      getDetails(ids)
      .then(details => {
          res.status(200)
          res.send(details[0])
        })
        .catch(err => {
          res.status(422)
          res.send({ error: 'Error in the /place request' })
        })
    })
})


module.exports = router;