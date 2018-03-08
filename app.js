/** 
   app.js
   ======
   BACKEND SERVER HITTING GOOGLE MAPS PLACE API
   --------------------------------------------------
   //////////////////////////////////////////////////
   GOOGLE PLACES API
   https://developers.google.com/places/web-service/intro
   ..................................................
   The Google Places API Web Service is a service
   that returns information about places — defined
   within this API as establishments, geographic
   locations, or prominent points of interest — using
   HTTP requests.  The following place requests are
   available: - Place Searches: return a list of
   places based on a user's location or search
   string.  - Place Details: requests return more
   detailed information about a specific Place,
   including user reviews.  - Place Add - Place
   Photos - Place Autocomplete - Query Autocomplete
   Each of the services is accessed as an HTTP
   request, and returns either an JSON or XML
   response. All requests to a Places service must
   use the https:// protocol, and include an API key.
   The Google Places API Web Service uses a place ID
   to uniquely identify a place.

   PLACE SEARCH --- Text Search Requests

   The Google Places API Text Search Service is a web
   service that returns information about a set of
   places based on a string — for example "pizza in
   New York" or "shoe stores near Ottawa" or "123
   Main Street". The service responds with a list of
   places matching the text string and any location
   bias that has been set.  The search response will
   include a list of places. You can send a Place
   Details request for more information about any of
   the places in the response.

   A Text Search request is an HTTP URL of the
   following form:

   https://maps.googleapis.com/maps/api/place/textsearch/output?parameters

   where output may be either of the following
   values: - json (recommended) indicates output in
   JavaScript Object Notation (JSON) - xml indicates
   output as XML

   Certain parameters are required to initiate a
   search request.  As is standard in URLs, all
   parameters are separated using the ampersand (&)
   character.

   Required parameters: - query: The text string on
   which to search - key: Your application's API key

   Optional parameters: - region - location - radius
   - language - minprice / maxprice - opennow -
   pagetoken - type

   You may bias results to a specified circle by
   passing a location and a radius parameter.

   EXAMPLES
   https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=<apiKey>
   https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&
   location=42.3675294,-71.186966&radius=10000&key=

   SEARCH RESPONSES

   A JSON response contains up to four root elements:
   - "status" - "results" - contains an array of
   places, with information about each.  -
   html_attributions - next_page_token

   Processing JSON with JavaScript:
   https://developers.google.com/maps/web-services/overview#ParsingJSON

   SEARCH RESULTS
   
   When the Google Places service returns JSON
   results from a search, it places them within a
   results array.  Each element of the results array
   contains a single result from the specified area
   (location and radius), ordered by prominence.

   Each result within the results array may contain
   the following fields: - icon, geometry, name,
   opening_hours, photos[], place_id, scope, alt_ids,
   price_level, rating, types[], vicinity

   PLACE ID

   Place IDs uniquely identify a place in the Google
   Places database and on Google Maps.

   Retrieve place details using the place ID

   PLACE DETAILS

   Once you have a place_id from a Place Search, you
   can request more details about a particular
   establishment or point of interest by initiating a
   Place Details request.

   A Place Details request is an HTTP URL of the
   following form:

   https://maps.googleapis.com/maps/api/place/details/output?parameters

   where output may be either of the following values:
   - json
   - xml

   Certain  parameters  are  required to  initiate  a
   search  request.   all  parameters  are  separated
   using the ampersand (&) character.

   - key (required)
   - placeid (required)
   - language (optional)
   - region (optional)

   https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&key=YOUR_API_KEY

   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
   --------------------------------------------------
   VERSION 0.1 2018-03-07T10:27:14
   ..................................................  -
   Initial commit
   __________________________________________________ 
   VERSION 1.0 2018-03-07T17:55:51
   ..................................................
   - first working version
   __________________________________________________
 */

const express = require('express');
const fetch = require('node-fetch');

const { PORT, gmaps } = require('./config');

const STATUS_OK = 200;
const STATUS_USER_ERROR = 422;

const APIKEY = gmaps.apiKey;
const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/place';
const TEXT_SEARCH = 'textsearch';
const DETAILS_REQUEST = 'details';
const JSON_OUTPUT = 'json';

/* to be used in more complicated query requests */
const parameters = [
  'query',
  'location',
  'region',
  'radius',
  'language',
  'minprice',
  'maxprice',
  'opennow',
  'pagetoken',
  'type',
];

/* Some helper functions */
const assembleQueryString = (userQuery) => {
  return `${GOOGLE_API_URL}/${TEXT_SEARCH}/${JSON_OUTPUT}?query=${userQuery}&key=${APIKEY}`;
}

const assembleDetailsRequest = (placeID) => {
  return `${GOOGLE_API_URL}/${DETAILS_REQUEST}/${JSON_OUTPUT}?placeid=${placeID}&key=${APIKEY}`;
}

/* Start the App */
const app = express();

app.get('/place', (req, res) => {

  /* pull the user's query from req.query.query
     and assemble it into a text search query */
  const queryString = assembleQueryString(req.query[parameters[0]]);

  fetch(queryString)
    .then(res => res.json())
    .then(resArr => {

      /* pull the place_id from the first result
         and assemble into a details request */
      const placeID = resArr.results[0].place_id;
      const detailsString = assembleDetailsRequest(placeID);

      fetch(detailsString)
        .then(res => res.json())
        .then(resultDetails => {

          /* if everything worked, return the result */
          res.status(STATUS_OK);
          res.send(resultDetails);
        })

        .catch(err => {
          res.status(STATUS_USER_ERROR);
          res.send({ err: err });
        });
    })

    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ err: err });
    });
});

app.listen(PORT, () => {
  console.log(`App is listening on PORT ${PORT} ...`);
});
