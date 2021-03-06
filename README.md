# Express Sweater Weather

[![Currently Refactoring](https://travis-ci.com/turingschool-examples/all-your-base.svg?branch=master)](https://travis-ci.com/turingschool-examples/all-your-base)

Production Link: (https://express-sweater-weather-aw.herokuapp.com/)
Endpoints can be hit using Postman

## Introduction
Express Sweater Weather is an API built in JavaScript using the Express framework along with the NodeJS runtime environment and Knex.  The app consumes the Google Geocode API, as well as the Darksky API to allow users to hit several endpoints to receive weather forecasts for different locations.

## Endpoints
1. Get Detailed Forecast for a Location
```
GET /api/v1/forecast?location=denver,co
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
### Example Response
```
{
  "location": "Denver, C0",
  "currently": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
  "hourly": {
    "summary": "Partly cloudy throughout the day and breezy this evening.",
    "icon": "wind",
    "data": [
      {
      "time": 1555016400,
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.9,
      "humidity": 0.65,
      "pressure": 1020.8,
      "windSpeed": 11.3,
      "windGust": 22.64,
      "windBearing": 293,
      "cloudCover": 1,
      "visibility": 9.02,
      },
    ]
  },
  "daily": {
    "summary": "No precipitation throughout the week, with high temperatures bottoming out at 58°F on Monday.",
    "icon": "clear-day",
    "data": [
      {
        "time": 1554966000,
        "summary": "Partly cloudy throughout the day and breezy in the evening.",
        "icon": "wind",
        "sunriseTime": 1554990063,
        "sunsetTime": 1555036947,
        "precipIntensity": 0.0001,
        "precipIntensityMax": 0.0011,
        "precipIntensityMaxTime": 1555045200,
        "precipProbability": 0.11,
        "precipType": "rain",
        "temperatureHigh": 57.07,
        "temperatureLow": 51.47,
        "humidity": 0.66,
        "pressure": 1020.5,
        "windSpeed": 10.94,
        "windGust": 33.93,
        "cloudCover": 0.38,
        "visibility": 9.51,
        "temperatureMin": 53.49,
        "temperatureMax": 58.44,
      },
    ]
  }
}
```
2. Post a favorite location
```
POST /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
### Example Response
```
status: 200
body:

{
  "message": "Denver, CO has been added to your favorites",
}
```

3. List Favorite Locations
```
GET /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
### Example Response
```
status: 200
body:
[
  {
    "location": "Denver, CO",
    "current_weather": {
      "summary": "Overcast",
      "icon": "cloudy",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 54.91,
      "humidity": 0.65,
      "pressure": 1020.51,
      "windSpeed": 11.91,
      "windGust": 23.39,
      "windBearing": 294,
      "cloudCover": 1,
      "visibility": 9.12,
    },
    "location": "Golden, CO",
    "current_weather": {
      "summary": "Sunny",
      "icon": "sunny",
      "precipIntensity": 0,
      "precipProbability": 0,
      "temperature": 71.00,
      "humidity": 0.50,
      "pressure": 1015.10,
      "windSpeed": 10.16,
      "windGust": 13.40,
      "windBearing": 200,
      "cloudCover": 0,
      "visibility": 8.11,
    }
  }
]
```
4. Removing Favorite Locations
```
DELETE /api/v1/favorites
Content-Type: application/json
Accept: application/json

body:

{
  "location": "Denver, CO",
  "api_key": "jgn983hy48thw9begh98h4539h4"
}
```
### Expected Response
```
status: 204
```

## Tech Stack
* Language: JavaScript
* Framework: Express(4.16.1)
* Runtime Environment: NodeJs
* Database: PostgreSQL(7.8.0)
* ORM: Knex(0.19.5)
* Testin: Jest(24.9.0)
* Api Calls With: node-fetch(2.6.0)

## Setup

* `git clone git@github.com:alect47/express-sweater-weather.git`
* `npm install
* `cd express-sweater-weather` followed by `psql` followed by `CREATE DATABASE ex_sweater_weather`
* `knex migrate:latest`
* `knex seed:run`
* Create a `.env` file with api keys
```
GOOGLE_API_KEY = "<GOOGLE_GEOCODE_KEY>"
DARK_SKY_API = "<DARKSKY_KEY>"
```
* `node bin/www` to start server

## Setting up your production environment
This repo comes with a lot of things prepared for you. This includes production ready configuration. To get started, you’ll need to do a few things. 

- Start a brand new app on the Heroku dashboard 
- Add a Postgres instance to your new Heroku app
- Find the URL of that same Postgres instance and copy it. It should look like a long url. It may look something like like `postgres://sdflkjsdflksdf:9d3367042c8739f3...`.
- Update your `knexfile.js` file to use your Heroku database instance. You’ll see a key of `connection` with a value of an empty string. This is where you’ll paste your new Postgres instance URL. 

Once you’ve set all of that up, you’ll need to `add the remote` to your new app. This should work no differently than how you’ve done it with any Rails project. Adding this remote will allow you to run `git push heroku master`. 

Once you’ve done that, you’ll need to `bash` into your Heroku instance and get some things set up. 

- Run the following commands to get started:
```
heroku run bash
npm install
nom install -g knex
knex migrate:latest
```

This will install any dependencies, install Knex, and migrate any changes that you’ve made to the database. 
