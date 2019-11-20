var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');



router.get('/', (request, response) => {
  var geoResponse = fetch('https://maps.googleapis.com/maps/api/geocode/json, {
                  method: 'get',
                  headers: {'Content-Type': 'application/json'},
                  qs: {key: 'AIzaSyCxsZ6ZwtaVGwlsIsnRL5F7nZuof2nvKAE'}
                })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error) => console.error({ error })
});

module.exports = router;
