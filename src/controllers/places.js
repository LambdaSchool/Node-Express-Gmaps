const express =  require('express');
const router = express.Router();

const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

// const sendUserError = (msg, res) => {
//   res.status(STATUS_USER_ERROR).json({ error: msg });
//   return;
// };

const {
  getIds,
  getDetails
} = require('../models/places.js');

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
      res.send( {error: "Error"} );
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
      res.send( {error: "Error"} );
    });
});

moduel.exports = router;