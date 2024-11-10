
// import express
const express = require("express");

// create express app
const app = express()

app.get("/", (req, res) => {
    return res.send("HELLO WORLD!")
})

// listen on port
app.listen(8080, () => {
    console.log("Now listening on PORT 8080")
})

