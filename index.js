require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes");
const port = process.env.PORT;

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "*"
  );

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "x-access-token");
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
