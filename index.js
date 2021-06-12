require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./src/routes");
const port = process.env.PORT;
const cors = require("cors");
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

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
