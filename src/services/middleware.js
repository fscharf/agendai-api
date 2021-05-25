const validJWTNeeded = (req, res, next) => {
  var token = req.query.token || req.body.token;
  if (!token) {
    return res.status(401).send({ Unauthorized });
  } else {
    req.jwt = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  }
};

module.exports = { validJWTNeeded };
