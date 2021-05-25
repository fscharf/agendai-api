var jwt = require("jsonwebtoken");

const validJWTNeeded = async (req, res, next) => {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.user_id = decoded.id;
    next();
  });
};

module.exports = { validJWTNeeded };
