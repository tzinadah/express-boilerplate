import express from "express";
import dotenv from "dotenv";
import dns from "dns";
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
  dns.lookup(req.body.url, (err) => {
    if (err) {
      res.json({ error: "Invalid URL" });
      return;
    }
    res.json({ url: req.body.url, shorthand: 1 });
  });
});

app.listen(PORT);
console.log(`Server is listening to port ${PORT}`);
