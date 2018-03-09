const express = require("express");
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const { getDistances } = require("../models/travel-distance.js");

router.get("/travel/modes", (req, res) => {
  const { start, finish } = req.query;
  getDistances(req.query.start, req.query.finish)
    .then(ids => {
      res.send({ STATUS_SUCCESS: ids });
    })
    .catch(err => {
      console.log(err);
      res.send({ STATUS_USER_ERROR: STATUS_USER_ERROR });
    });
});

module.exports = router;

//Comment to add.