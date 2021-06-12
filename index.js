require("dotenv").config();

const express = require("express");
const app = express();
const router = require("./src/routes");
const port = process.env.PORT;
const cors = require("cors");
app.use(
  cors({
    credentials: true,
    allowedHeaders: "*",
    origin: "http://localhost:3000",
  })
);

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
