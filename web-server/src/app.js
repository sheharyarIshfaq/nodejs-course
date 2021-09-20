const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geoCode = require("./utils/geocode");
const foreCast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sheharyar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Sheharyar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Sheharyar",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "You must include the address term",
    });
    return;
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({ error });
        return;
      }

      foreCast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          res.send({ error });
          return;
        }

        res.send({
          forecast: foreCastData,
          location,
          address: req.query.address,
        });
      });
    }
  );

  //   res.send({
  //     forecast: "Raining",
  //     location: "Rawalpindi",
  //     address: req.query.address,
  //   });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sheharyar",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Sheharyar",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
