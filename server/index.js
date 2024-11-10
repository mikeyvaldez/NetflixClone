// import express
const express = require("express");
const movies = require("./movies.json");

// create express app
const app = express();

// root page
app.get("/", (req, res) => {
  return res.send("HELLO WORLD!");
});

// movie list page
app.get("/movies/list", (req, res) => {
  return res.send(movies);
});

// listen on port
app.listen(8080, () => {
  console.log("Now listening on PORT 8080");
});
