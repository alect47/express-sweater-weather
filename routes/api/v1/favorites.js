var express = require('express');
var forecast = require('./forecast');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

const helpers = require('../../../application_helper/helper_functions');
const fetchForecast = helpers.fetchForecast;


async function getUser(key) {
  let users = await database('users').where('api_key', key);
  // console.log(users[0].id)
  return users[0].id;
}

async function getFavorites(key) {
  let usersId = await getUser(key);
  let favorites = await database('favorites').where('user_id', usersId);
  const locations = await favorites.map(x => x.location);
  return locations;
}

const getForecasts = (locations) => {
  const promises = locations.map(async (location) => {
      return {
          location: `${location}`,
          forecast: await fetchForecast(location)
      }
  });
  return Promise.all(promises);
}

async function getFavForecast(key) {
  let locations = await getFavorites(key);
  let forecasts = await getForecasts(locations)
  // might need to make anon async function within map
  // let forecasts = locations.map(x => await fetchForecast(x));

  console.log(forecasts)
  // return forecasts;
}
// async function getFavForecast(key) {
//   let locations = await getFavorites(key);
//   // might need to make anon async function within map
//   let forecasts = locations.map(x => await fetchForecast(x));
//   console.log(forecasts)
//   return forecasts;
// }

// Might need to add .select() to the end of the query?
router.get('/', (request, response) => {
  // getFavorites(request.body.api_key)
  getFavForecast(request.body.api_key)
});


// Could create const all = () => database('papers')
//   .select()
module.exports = router;
