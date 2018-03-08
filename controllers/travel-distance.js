const express = require("express");
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const { getDistances } = require("../models/travel-distance.js");

router.get("/travel/modes", (req, res) => {
  getDistances(req.query.search)
    .then(ids => [ids[0]])
    .then(getDistances)
    .then(details => {
      res.status(STATUS_SUCCESS);
      res.send({ distances: details });
    })
    .catch(err => {
      console.log(err);
      res.status(STATUS_USER_ERROR);
      res.send({ err: err });
    });
});

module.exports = router;
