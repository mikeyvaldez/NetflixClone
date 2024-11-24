
import express from "express";  // import express
import cors from "cors";        // import cors
import Movies from "./routes/movies.js";
import Auth from "./routes/auth.js";
import Sub from "./routes/sub.js";
import path from "path";

const app = express();  // create express app

app.use(express.json())
app.use(cors());

// root page
app.get("/", (req, res) => {
  return res.send("HELLO WORLD");
});


app.use("", Movies);
app.use("/auth", Auth);
app.use("/sub", Sub);

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
