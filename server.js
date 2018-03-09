const config = require('./config');
const fetch = require('node-fetch');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = config.port;
const API_KEY = config.gmaps.apiKey;
const server = express();

const STATUS_SUCCESSFUL = 200;
const STATUS_USER_ERROR = 422;

const detailsUrl = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=';
const searchUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';

server.use(bodyParser.json());

server.get('/place', (req, res) => {
    getIds(req.query.search)
    .then(ids => [ids[0]])
    .then(getDetails)
    .then(details => {
      res.status(STATUS_SUCCESSFUL);
      res.send( {places: details} );
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send( {err: err} );
    });
    // let search = req.query.search.split(' ');
    // search = search.join('+');
    // const textSearch = searchUrl + search + '&key=' + API_KEY;
    // fetch(textSearch)
    //     .then(places => places.json())
    //     .then(places => {
    //         const placeId = places.results[0].place_id;
    //         const urlDetail = detailsUrl + placeId + '&key=' + API_KEY;
    //         fetch(urlDetail)
    //             .then(details => details.json())
    //             .then(details => {
    //                 res.status(STATUS_SUCCESSFUL);
    //                 res.send(details.result);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //                 res.status(STATUS_USER_ERROR);
    //                 res.send({ err: err });
    //             });
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         res.status(STATUS_USER_ERROR);
    //         res.send({ err: err });
    //     });
})

server.get('/places', (req, res) => {
    getIds(req.query.search)
    .then(getDetails)
    .then(details => {
      res.status(STATUS_SUCCESSFUL);
      res.send( {places: details} );
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send( {err: err} );
    });
    // const search = req.query.search;
    // const placesURL = searchUrl + search + '&key=' + API_KEY;
    // fetch(placesURL)
    //     .then(places => places.json())
    //     .then(places => {
    //     placeIds = places.results.map(place => place.place_id);
    //     details = placeIds.map(id => {
    //         const detailedURL = detailsUrl + id + '&key=' + API_KEY;
    //         return fetch(detailedURL)
    //         .then(detailed => detailed.json())
    //         .then(detailed => detailed.result);
    //     });
    
    //     Promise.all(details)
    //         .then(details => {
    //         res.status(STATUS_SUCCESSFUL);
    //         res.send( {places: details} )
    //         })
    //         .catch(err => {
    //         console.log(err)
    //         res.status(STATUS_USER_ERROR);
    //         res.send( {err: err});
    //         });
    //     })
    //     .catch(err => {
    //     console.log(err)
    //     res.status(STATUS_USER_ERROR);
    //     res.send( {err: err} );
    //     });
});

function getIds(query) {
    return new Promise((resolve, reject) => {
    const searchUrlPlaces = searchUrl + query + '&key=' + API_KEY;
    fetch(searchUrlPlaces)
        .then(places => places.json())
        .then(places => {
        const ids = places.results.map(place => place.place_id);
        resolve(ids);
        })
        .catch(err => {
        reject(err);
        });
    });
}

function getDetails(ids) {
    return new Promise((resolve, reject) => {
      const details = ids.map(id => {
      const detailsUrlPlaces = detailsUrl + id + '&key=' + API_KEY;
      return fetch(detailsUrlPlaces)
        .then(detailed => detailed.json())
        .then(detailed => detailed.result);
      });
  
      Promise.all(details)
        .then(details => {
          resolve(details);
        })
        .catch(err => {
          reject(err);
        });
    });
}  

server.listen(PORT, err => {
    if (err) {
      console.log(`Error starting server: ${err}`);
    } else {
      console.log(`Server listening on port ${PORT}`);
    }
  });