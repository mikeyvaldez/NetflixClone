// import express
const express = require("express");
const cors = require("cors");
const movies = require("./movies.json");

// create express app
const app = express();

// middleware a
app.use(cors());

// root page
app.get("/", (req, res) => {
  return res.send(movies);
});

// movie list page
app.get("/movies/list", (req, res) => {
  const offset = parseInt(req.query.offset);
  const from = offset;
  const to = from + 12;
  const moviesSubset = [...movies].slice(from, to);
  setTimeout(() => {
    return res.json({ movies: moviesSubset, count: movies.length });
  }, 3000);
});

app.get("/movie/:id", (req, res) => {
  const id = req.params.id;
  const movie = movies.find(m => m.id === id);
  return res.send(movie);
  
});

// listen on port
app.listen(8080, () => {
  console.log("Now listening on PORT 8080");
});
