var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

async function fetchLocation(address) {
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address.location}&key=${process.env.GOOGLE_API_KEY}`);
  let location = await response.json();
  return location;
}


// Might need to add .select() to the end of the query?
router.get('/', (request, response) => {
  database('users').where('api_key', request.body.api_key)
    .then(users => {
      if (users.length) {
        fetchForecast(request.query)
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

// Could create const all = () => database('papers')
//   .select()
module.exports = router;
