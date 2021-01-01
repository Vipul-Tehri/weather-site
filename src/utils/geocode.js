const request = require("request");

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmlwdWx0ZWhyaSIsImEiOiJja2IzdTdhenYwOWVlMnlvNnplczZkY2ZjIn0.XoXfhO-PvIdgvKNk_odSMg&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("There is some error while connection", undefined);
      //   console.log("There is some error while connection");
    } else if (body.features.length == 0) {
      callback("Unable to rectify the location", undefined);
      //   console.log("Unable to rectify the location");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
      //   console.log(`Lat Long for Specified location ${data.features[0].center}`);
    }
  });
};

module.exports = geoCode;
