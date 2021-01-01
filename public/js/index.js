console.log("client side javascript file is loaded");

fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

const weatherForm = document.querySelector("form");
const searchText = document.querySelector("input");
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  message1.textContent = '';
  message2.textContent = '';

  message1.textContent = 'Loading...';
  // console.log("location", searchText.value);
  const location = searchText.value;
  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        message1.textContent = data.error;
      } else {
        console.log(data);
        message1.textContent = data.forecast;
        message2.textContent = data.location;
      }
    });
  });
});

// const address = "boston";
// const mapurl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmlwdWx0ZWhyaSIsImEiOiJja2IzdTdhenYwOWVlMnlvNnplczZkY2ZjIn0.XoXfhO-PvIdgvKNk_odSMg&limit=1`;
// // const
// fetch(mapurl).then((response) => {
//   response.json().then((body) => {
//     console.log("data", body);

//     const lat = body.features[0].center[1];
//     const long = body.features[0].center[0];
//     const location = body.features[0].place_name;

//     const forecastURL = `http://api.weatherstack.com/current?access_key=009364a175603e0db07c1fac23a25510&query=${lat},${long}`;
//     fetch(forecastURL).then((response) => {
//       response.json().then((body) => {
//         console.log(
//           "Forecast : " +
//             `${body.current.weather_descriptions[0]}.It is currently ${body.current.temperature} degree out. There is ${body.current.precip}% chance of rain`
//         );
//         console.log("Location : " + location);
//       });
//     });
//   });
// });
