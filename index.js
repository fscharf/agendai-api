require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes");
const port = process.env.PORT;
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
