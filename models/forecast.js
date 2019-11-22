class Forecast {
  
  constructor(location, forecast) {
    this.location = location.location;
    this.currently = forecast.currently;
    this.hourly = forecast.hourly;
    this.daily = forecast.daily;
  }

}
module.exports = Forecast;
