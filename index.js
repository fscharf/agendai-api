require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes");
const port = process.env.PORT;
const corsMiddleware = require("./src/services/cors");

app.use(corsMiddleware);
app.options("*", corsMiddleware);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers["authorization"];
  if (!token) return next(); //if no token, continue

  token = token.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      next();
    }
  });
});

app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
