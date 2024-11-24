
const express = require("express");  // import express
const cors = require("cors");        // import cors
const app = express();  // create express app
const path = require("path");

app.use(express.json())
app.use(cors());

// root page
app.get("/", (req, res) => {
  return res.send("HELLO WORLD");
});


app.use("", require("./routes/movies"));
app.use("/auth", require("./routes/auth"));
app.use("/sub", require("./routes/sub"));

const port = process.env.PORT;
const __dirname = path.resolve();

// listen on port
app.listen(port, () => {
  console.log(`Now listening on PORT ${port}`);
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
})
