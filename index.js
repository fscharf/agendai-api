require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes");
const port = process.env.PORT;
const cors = require("cors");

app.use(cors());

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
