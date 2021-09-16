const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");
const chalk = require("chalk");

const locationAddress = process.argv[2];

if (!locationAddress) {
  console.log(chalk.red.inverse("Please provide address!"));
} else {
  geoCode(locationAddress, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return console.log(error);
    }

    foreCast(
      latitude,
      longitude,
      (
        error,
        { weatherDescription, temperature, feelsLikeTemperature } = {}
      ) => {
        if (error) {
          return console.log(error);
        }

        console.log(location);
        console.log(
          chalk.inverse(weatherDescription) +
            `: The temperature is ${temperature} Fahrenheit but it feels like ${feelsLikeTemperature} Fahrenheit`
        );
      }
    );
  });
}
