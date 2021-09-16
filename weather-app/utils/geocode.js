const request = require("request");

const geoCode = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1Ijoic2hlaGFyeWFyMyIsImEiOiJja3JweHVuOWIyaHk1MnFrZG5uOGc1bzB5In0.8AY-3rDb8I2NvKij58JDhQ&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Something went wrong! Unable to connect to location services");
    } else if (body.features.length === 0) {
      callback(
        "Unable to get find the location. Try entering another location",
        undefined
      );
    } else {
      const locationData = body.features[0];
      const longitude = locationData.center[0];
      const latitude = locationData.center[1];
      const location = locationData.place_name;

      callback(undefined, {
        longitude,
        latitude,
        location,
      });
    }
  });
};
module.exports = geoCode;
