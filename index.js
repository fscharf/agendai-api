require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes");
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());

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
