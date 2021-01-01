const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const directoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const hbsPartials = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(hbsPartials);

// setup static directory to serve
app.use(express.static(directoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vipul",
  });
});

app.get("/aboutus", (req, res) => {
  res.render("aboutus", {
    title: "About Me",
    name: "Tehri Sahb",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Vipul Tehri",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please fill the address",
    });
  }

  let location = encodeURIComponent(req.query.address);

  geoCode(location, (error, { latitude, longitude, location } = {}) => {
    if (error)
      return res.send({
        error,
      });

    forecast(latitude, longitude, (error, forecastData) => {
      if (error)
        return res.send({
          error,
        });
      res.send({
        location,
        forecast:forecastData,
        address: req.query.address,
      });
      console.log(location);
      console.log(forecastData);
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("pagenotfound", {
    title: 404,
    text: "Help article not found",
    name: "Vipul Tehri",
  });
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({
      error: "Please set the search value",
    });
  }

  res.send({
    products: req.query.search,
  });
});

app.get("*", (req, res) => {
  res.render("pagenotfound", {
    title: 404,
    text: "Page not found",
    name: "Vipul Tehri",
  });
});

app.listen(port, () => {
  console.log("Server is up and running on port "+port);
});
