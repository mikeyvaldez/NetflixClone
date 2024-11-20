
const express = require("express");  // import express
const cors = require("cors");        // import cors
const app = express();  // create express app

app.use(express.json())
app.use(cors());

// root page
app.get("/", (req, res) => {
  return res.send("HELLO WORLD");
});


app.use("", require("./routes/movies"));
app.use("/auth", require("./routes/auth"));
app.use("/sub", require("./routes/sub"));

// listen on port
app.listen(8080, () => {
  console.log("Now listening on PORT 8080");
});
