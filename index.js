require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const router = require("./src/routes");
const port = process.env.PORT;
const cors = require("cors");

const ctrlSystemRoutes = require("./src/controllers/ctrl-system-query/ctrl-system.controller")

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "*"); // allowed actios
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // to deal with chrome sending an extra options request
  }
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);

let ctrlSystem = require("./src/models/json/ctrl_system.json");

app.get('/ctrl-system', (req, res) => {
  res.send(ctrlSystem);
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
