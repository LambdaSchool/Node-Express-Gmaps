const express = require('express');
const router = express.Router();

const { getPlaceIDs, getDetails } = require('../models/PlacesModel');

const { getTravelDetails } = require('../models/TravelModel');

const STATUS_USER_ERROR = 422;
let origins = '';
let destinations = '';
let storageDetails;

router.get('/place', (req, res) => {
  const { term } = req.query;
  const searchTerm = term.split(' ').join('+');
  getPlaceIDs(searchTerm)
    .then(ids => [ids[0]])
    .then(getDetails)
    .then(details => {
      if (origins.length > 0)
        destinations =
          'destinations=' +
          details[0].geometry.location.lat +
          ',' +
          details[0].geometry.location.lng;
      else
        origins =
          'origins=' +
          details[0].geometry.location.lat +
          ',' +
          details[0].geometry.location.lng;
      storageDetails = details;
      if (destinations.length)
        return getTravelDetails(origins + '&' + destinations);
      else return details;
    })
    .then(details => {
      if (Object.is(details, storageDetails))
        res.send({ locationDetails: storageDetails });
      else
        res.send({
          locationDetails: storageDetails,
          travelDetails: details,
        });
    })
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
