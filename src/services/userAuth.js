const jwt = require("jsonwebtoken");
const utils = require("./utils");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const nodemailer = require("../services/config");

const signIn = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ where: { email: email } });

  if (!email || !password) {
    return res.status(400).json({
      error: true,
      message: "Por favor, preencha todos os campos.",
    });
  }

  if (!user || !(await bcrypt.compareSync(password, user.hashedPassword))) {
    return res.status(401).json({
      error: true,
      message: "E-mail ou senha inválidos.",
    });
  }

  if (!user.accountVerified || !user.confirmationCode) {
    return res.status(400).json({
      error: true,
      message: "Você precisa ativar sua conta. Por favor, cheque seu e-mail.",
    });
  }

  // generate token
  const token = utils.generateToken(user);
  // get basic user details
  const userObj = utils.getCleanUser(user);
  // return the token along with user details
  return res.json({
    user: userObj,
    token,
    message: "Autenticado com sucesso.",
  });
};

// verify the token and return it if it's valid
const verifyToken = async (req, res) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token;
  var email = req.body.email || req.query.email;

  const userAuth = await User.findOne({ where: { email: email } });

  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required.",
    });
  }

  // check token that was passed by decoding token using secret
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: "Invalid token.",
      });

    // return 401 status if the user_id does not match.
    if (user.user_id !== userAuth.user_id) {
      return res.status(401).json({
        error: true,
        message: "Invalid user.",
      });
    }
    // get basic user details
    var userObj = utils.getCleanUser(user);
    return res.json({ user: userObj, token });
  });
};

const verifyUser = async (req, res, next) => {
  await User.findOne({
    where: {
      confirmationCode: req.params.confirmationCode,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Conta não encontrada" });
      }

      user.accountVerified = true;
      user.save((err) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        next();
      });
    })
    .catch((e) => console.log("error", e));
};

const resetPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!email) {
    return res.status(400).json({
      error: true,
      message: "Por favor, preencha todos os campos.",
    });
  }

  if (!user) {
    return res.status(400).json({
      error: true,
      message: "E-mail não encontrado.",
    });
  }

  nodemailer.sendResetPasswordEmail(
    user.username,
    email,
    user.confirmationCode
  );

  return res.status(200).json({
    error: false,
    message: `Sucesso! Enviamos um link de atualização de senha para ${email}.`,
  });
};

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

module.exports = {
  verifyToken,
  signIn,
  verifyUser,
  validJWTNeeded,
  resetPassword,
};
