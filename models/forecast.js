class Forecast {
  // Think of a constructor as being similar to initialize in Ruby
  // Instead of setting attributes like @name = name in JavaScript we say this.name = name
  constructor(location, forecast) {
    this.location = location;
    this.currently = forecast.currently;
    this.hourly = forecast.hourly;
    this.daily = forecast.daily;
  }

}
module.exports = Forecast;
