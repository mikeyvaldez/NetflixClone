
import express from "express";  // import express
import cors from "cors";        // import cors
import movies from "./routes/movies";
import auth from "./routes/auth";
import sub from "./routes/sub";
import path from "path";

const app = express();  // create express app

app.use(express.json())
app.use(cors());

// root page
app.get("/", (req, res) => {
  return res.send("HELLO WORLD");
});


app.use("", movies);
app.use("/auth", auth);
app.use("/sub", sub);

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
