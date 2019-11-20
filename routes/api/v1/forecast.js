var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

async function fetchLocation() {
  let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?address=denver,co&key=AIzaSyCxsZ6ZwtaVGwlsIsnRL5F7nZuof2nvKAE');
  let location = await response.json();
  return location;
}

async function coordinates() {
  let data = await fetchLocation()
  let coords = data.results[0].geometry.location;
  return coords;
};
async function fetchForecast() {
  let coords = await coordinates();
  let response = await fetch(`https://api.darksky.net/forecast/4c4d194e5a137d75e00d72538cb9dd68/${coords.lat},${coords.lng}`);
  let forecast = await response.json();
  return forecast;
  // return console.log(forecast);
};


router.get('/', (request, response) => {
  fetchForecast()
    .then(data => response.send(data))
    .catch(reason => response.send(reason.message))
});

module.exports = router;
