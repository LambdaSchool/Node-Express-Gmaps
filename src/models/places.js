const fetch = require('node-fetch');
const config = require('../../config');

const placesKey = config.gmaps.apiKeys.places;
const textSearchURI = config.gmaps.URIs.places.TEXT_SEARCH;
const placeDetailsURI = config.gmaps.URIs.places.PLACE_DETAILS;
let promises = [];

function getPlace(searchTxt) {
    return new Promise((resolve, reject) => {
        const searchUrl = textSearchURI + searchTxt + '&key=' + placesKey;
        fetch(searchUrl)
            .then(places => places.json())
            .then(places => places.results[0].place_id)
            .then(placeId => {
                promises.push(getDetail(placeId));
                Promise.all(promises).then(val => resolve(val))
                    .catch(err => reject(err));
            })
            .catch(err => reject(err));
    });
}

function getPlaces(searchTxt) {
    return new Promise((resolve, reject) => {
        let searchUrl = textSearchURI + searchTxt + '&key=' + placesKey;
        fetch(searchUrl)
            .then(places => places.json())
            .then(places => places.results.map((place) => place.place_id))
            .then(ids => {
                let promise = ids.map((placeId) => getDetail(placeId));
                Promise.all(promise).then(val => resolve(val)).catch(error => reject(error));
            })
            .catch(err => reject('Error: ' + err));
    });
}

function getDetail(id) {
    const detailsUrl = placeDetailsURI + id + '&key=' + placesKey;
    return fetch(detailsUrl).then(detailed => detailed.json());
}

module.exports = {getPlace, getPlaces};
