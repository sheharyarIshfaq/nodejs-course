const request = require("request");

const foreCast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=dc8013061c3e24abb7f7c92be0f0950d&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Something went wrong! Unable to get the weather Information",
        undefined
      );
    } else if (body.error) {
      callback("Unable to find the weather data of the location", undefined);
    } else {
      const weatherData = body.current;
      const temperature = weatherData.temperature;
      const feelsLikeTemperature = weatherData.feelslike;
      const weatherDescription = weatherData.weather_descriptions[0];

      callback(
        undefined,
        `${weatherDescription} : The Temperature is ${temperature}. But it feels like ${feelsLikeTemperature}`
      );
    }
  });
};

module.exports = foreCast;
