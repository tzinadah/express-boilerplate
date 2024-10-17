import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import mongoose from "mongoose";
const __dirname = import.meta.dirname;

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("connected"))
  .catch((err) => {
    console.error(err);
  });

const Schema = mongoose.Schema;
const shortURLSchema = new Schema({
  _id: Number,
  url: String,
});

const ShortURL = mongoose.model("ShortURL", shortURLSchema);

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
