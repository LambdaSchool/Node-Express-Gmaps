const express = require('express');

router = express.Router();
const {
  getIds,
  getDetails,
  getDistances
} = require('../models/places.js');

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

router.get('/place', (req, res) => {
  getIds(req.query.search)
    .then(ids => [ids[0]])
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

router.get('/places', (req, res) => {
  getIds(req.query.search)
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

//Day II
// router.get('/travel/mode', (req, res) => {
//     const { origins, destinations, mode } = req.query;
//     console.log(origins, destinations, mode);
//     getTimeMode(origins, destinations, mode)
//     .then(timeMode => {
//         res.status(STATUS_SUCCESS);
//         res.send(timeMode);
//     })
//     .catch(err => {
//         res.status(STATUS_USER_ERROR);
//         res.send( {err: err} );
//       });
// });

router.get('/travel/mode', (req, res) => {
    const { origins, destinations } = req.query;
    getDistances(origins, destinations)
    .then(json => {
        res.status(STATUS_SUCCESS);
        res.send({ distances: json });
    })
    .catch(err => {
        res.status(STATUS_USER_ERROR);
        res.send({ error: err });
    });
});

module.exports = router;