const validJWTNeeded = (req, res, next) => {
  if (req.query.token || req.body.token) {
    return res.status(401).send({error: true, message: "Unauthorized"});
  } else {
    req.jwt = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  }
};

module.exports = { validJWTNeeded };
