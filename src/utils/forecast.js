const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=009364a175603e0db07c1fac23a25510&query=${lat},${long}`;

  request({ url, json: true }, (error, {body}) => {
    if (error) {
      callback("There is some error while connection!", undefined);
      // console.log("There is some error while connection!");
    } else if (body.error) {
      callback("Can not log weather details", undefined);
      // console.log("Can not log weather details");
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}.It is currently ${body.current.temperature} degree out. But It feels like ${body.current.feelslike} degree out. There is ${body.current.precip}% chance of rain`);
    }
  });
};

module.exports = forecast;
