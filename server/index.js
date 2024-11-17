
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


app.use("", require("/routes/movies"));
app.use("/auth", require("/routes/auth"));

// listen on port
app.listen(8080, () => {
  console.log("Now listening on PORT 8080");
});
