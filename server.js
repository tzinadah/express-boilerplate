import express from "express";
import dotenv from "dotenv";
const __dirname = import.meta.dirname;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/add-url", (req, res) => {
  res.json({ url: req.body.url, shorthand: 1 });
});

app.listen(PORT);
console.log(`Server is listening to port ${PORT}`);
