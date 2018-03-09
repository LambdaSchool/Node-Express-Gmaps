const express = require('express');
const router = express.Router();
const {STATUS_SUCCESS, STATUS_USER_ERROR} = require('../statusCodes');
const {getPlace, getPlaces} = require('../models/places.js');

router.get('/place', (req, res) => {
    getPlace(req.query.searchTxt)
        .then(response => res.send(response[0]))
        .catch(err => res.status(STATUS_USER_ERROR).send({err: err}));
});

router.get('/places', (req, res) => {
    getPlaces(req.query.searchTxt)
        .then(response => res.status(STATUS_SUCCESS).send(response))
        .catch(err => {
            res.status(STATUS_USER_ERROR);
            res.send({err: err});
        });
});

module.exports = router;



