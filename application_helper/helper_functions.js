const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const fetch = require('node-fetch');
const Forecast = require('../models/forecast')
const Favorite = require('../models/favorite')

async function fetchLocation(address) {
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_API_KEY}`);
  let location = await response.json();
  return location;
}

async function coordinates(address) {
  let data = await fetchLocation(address)
  let coords = await data.results[0].geometry.location;
  return coords;
};

// might want to have models for data to format forecast
async function fetchForecast(address) {
  let coords = await coordinates(address);
  let response = await fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_API}/${coords.lat},${coords.lng}?exclude=minutely,alerts,flags`);
  let forecast = await response.json();
  let formattedForecast = await new Forecast(address, forecast);
  return formattedForecast;
};

async function fetchForecastFav(address) {
  let forecast = await fetchForecast(address);
  let currentForecast = await new Favorite(address, forecast)
  return currentForecast;
};

module.exports = {
  fetchLocation: fetchLocation,
  coordinates: coordinates,
  fetchForecast: fetchForecast,
  fetchForecastFav: fetchForecastFav
}
