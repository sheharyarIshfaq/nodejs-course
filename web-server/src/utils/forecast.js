const request = require("request");

const foreCast = (latitude, longitude, callback) => {
  // const url = `http://api.weatherstack.com/current?access_key=dc8013061c3e24abb7f7c92be0f0950d&query=${latitude},${longitude}&units=f`; Fahrenheit
  const url = `http://api.weatherstack.com/current?access_key=dc8013061c3e24abb7f7c92be0f0950d&query=${latitude},${longitude}`;

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
      const humidity = weatherData.humidity;

      callback(
        undefined,
        `${weatherDescription} : The Temperature is ${temperature} degrees. But it feels like ${feelsLikeTemperature} degrees. The Humidity is ${humidity}.`
      );
    }
  });
};

module.exports = foreCast;
