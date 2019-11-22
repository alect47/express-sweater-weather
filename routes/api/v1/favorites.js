var express = require('express');
var forecast = require('./forecast');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

const helpers = require('../../../application_helper/helper_functions');
const fetchForecast = helpers.fetchForecast;
const fetchForecastFav = helpers.fetchForecastFav;


async function getUser(key) {
  let users = await database('users').where('api_key', key);
  return users[0].id;
}

const getForecasts = (locations) => {
  const promises = locations.map(async (location) => {
      return {
          location: `${location}`,
          current_forecast: await fetchForecastFav(location)
      }
  });
  return Promise.all(promises);
}

async function getFavorites(key) {
  let usersId = await getUser(key);
  let favorites = await database('favorites').where('user_id', usersId);
  var locations = await favorites.map(x => x.location);
  let faves = await getForecasts(locations);
  return faves;
};

router.get('/', (request, response) => {
  database('users').where('api_key', request.body.api_key)
    .then(users => {
      if (users.length) {
        getFavorites(request.body.api_key)
          .then(data => response.status(200).send(data))
          .catch(reason => response.send(reason.message))
      } else {
        response.status(401).json({
          error: `Unauthorized, Could not find user with api key: ${request.body.api_key}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

router.delete('/', (request, response) => {
  database('users').where('api_key', request.body.api_key)
    .then(users => {
      if (users.length) {
        database('favorites').where('user_id', `${users[0].id}`).where('location', request.body.location).del()
          .then(data => response.status(204).send())
          .catch(reason => response.send(reason.message))
      } else {
        response.status(401).json({
          error: `Unauthorized, Could not find user with api key: ${request.body.api_key}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

router.post('/', (request, response) => {
  const location = request.body.location
  console.log(location)

  database('users').where('api_key', request.body.api_key)
    .then(users => {
      if (users.length) {
        database('favorites').insert({ location: `${location}`, user_id: `${users[0].id}`}, "id")
          .then(data => response.status(201).send(`"message": "${location} has been added to your favorites"`))
          .catch(reason => response.send(reason.message))
      } else {
        response.status(401).json({
          error: `Unauthorized, Could not find user with api key: ${request.body.api_key}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});


module.exports = router;
