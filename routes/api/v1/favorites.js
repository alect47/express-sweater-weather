var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');

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


// Might need to add .select() to the end of the query?
router.get('/', (request, response) => {
  getFavorites(request.body.api_key)
});

// Could create const all = () => database('papers')
//   .select()
module.exports = router;
