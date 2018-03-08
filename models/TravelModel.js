const fetch = require('node-fetch');
const config = require('../config');

const API_KEY = config.gmaps.TravelAPIKey;
const STATUS_USER_ERROR = 422;
const SEARCH_REQUEST =
  'https://maps.googleapis.com/maps/api/distancematrix/json?';
//https://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC&destinations=San+Francisco&mode=driving&key=YOUR_API_KEY

const getTravelDetails = searchTerms => {
  const driving = new Promise((resolve, reject) => {
    fetch(SEARCH_REQUEST + searchTerms + '&mode=driving&key=' + API_KEY)
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
  const transit = new Promise((resolve, reject) => {
    fetch(SEARCH_REQUEST + searchTerms + '&mode=transit&key=' + API_KEY)
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
  const bicycling = new Promise((resolve, reject) => {
    fetch(SEARCH_REQUEST + searchTerms + '&mode=bicycling&key=' + API_KEY)
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
  const walking = new Promise((resolve, reject) => {
    fetch(SEARCH_REQUEST + searchTerms + '&mode=walking&key=' + API_KEY)
      .then(res => res.json())
      .then(response => resolve(response))
      .catch(err => reject(err));
  });

  return Promise.all([driving, transit, bicycling, walking])
    .then(results => {
      let shortestMode = results[0];
      results.forEach(each => {
        if (
          each.rows[0].elements[0].duration.value <
          shortestMode.rows[0].elements[0].duration.value
        )
          shortestMode = each;
      });
      return shortestMode;
    })
    .catch(err => console.log('There was an error in getTravelDetails: ', err));
};

module.exports = { getTravelDetails };
