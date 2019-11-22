class Favorite {

  constructor(location, forecast) {
    this.location = location.location;
    this.current_weather = forecast.currently;
  }

}
module.exports = Favorite;
