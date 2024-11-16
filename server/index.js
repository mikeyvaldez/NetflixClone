
const express = require("express");  // import express
const cors = require("cors");        // import cors
const { prisma } = require("./db")   // import prisma

// create express app
const app = express();

// middleware
app.use(cors());

// root page
app.get("/", (req, res) => {
  return res.send(movies);
});

// movie list page
app.get("/movies/list", async (req, res) => {
  const offset = parseInt(req.query.offset);  
  const count = await prisma.movie.count()     // utilizing prisma to hold the amount of data
  // implementing pagination using prisma
  const movies = await prisma.movie.findMany({
    take: 12,
    skip: offset
  });

  return res.json({movies, count});
});

app.get("/movie/:id", async (req, res) => {
  const id = req.params.id;  

  // using prisma to find movie by id
  const movie = await prisma.movie.findUnique({
    where: {
      id: parseInt(id),
    }
  })
  return res.send(movie);
  
});

// listen on port
app.listen(8080, () => {
  console.log("Now listening on PORT 8080");
});
