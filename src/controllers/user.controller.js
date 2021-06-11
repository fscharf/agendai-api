const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const nodemailer = require("../services/config");
var jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const getUsers = async (req, res) => {
  const { username, email, isActive, isAdmin, query } = req.query;

  const getQueryParams = () => {
    var condition = {};

    if (username) {
      condition.username = username;
    }
    if (email) {
      condition.email = email;
    }
    if (query) {
      condition = {
        [Op.or]: [
          {
            username: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      };
    }
    if (isAdmin) {
      condition.isAdmin = { [Op.eq]: isAdmin };
    }
    if (isActive) {
      condition.isActive = { [Op.eq]: isActive };
    }

    return condition;
  };

  await User.findAll({ where: getQueryParams() })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: "Oops, ocorreu um erro: " + err,
      });
    });
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  await User.findOne({ where: { user_id: id } })

    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: "Oops, ocorreu um erro: " + err,
      });
    });
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const emailExists = await User.findOne({ where: { email: email } });

  if (!username && !email && !password) {
    return res.status(400).json({
      error: true,
      message: "Por favor, preencha todos os campos.",
    });
  }

  if (emailExists) {
    return res.status(401).json({
      error: true,
      message: "E-mail já cadastrado.",
    });
  }

  const token = jwt.sign({ email: email }, process.env.JWT_SECRET);

  return await User.create({
    username: username,
    email: email,
    hashedPassword: hashedPassword,
    confirmationCode: token,
  })
    .then(() => {
      if (!token) {
        return res.status(500).json({
          error: true,
          message: "No token provided.",
        });
      }
      nodemailer.sendConfirmationEmail(username, email, token);
      return res.status(200).json({
        error: false,
        message: "Conta cadastrada com sucesso! Por favor, cheque seu e-mail.",
      });
    })
    .catch((err) => {
      return res.status(401).json({
        error: true,
        message: "Oops, ocorreu um erro: " + err,
      });
    });
};

const updateUser = async (req, res) => {
  let id = req.params.id;
  let confirmationCode =
    req.params.confirmationCode || req.query.confirmationCode;

  const {
    username,
    email,
    password,
    checkPassword,
    isAdmin,
    isActive,
    isResetPassword,
  } = req.body;

  const emailExists = await User.findOne({ where: { email: email } });

  let currentUser;
  if (id)
    currentUser = await User.findOne({
      where: { user_id: id },
    });
  if (confirmationCode) {
    currentUser = await User.findOne({
      where: { confirmationCode: confirmationCode },
    });
  }

  let hashedPassword;

  if (password) {
    if (
      checkPassword &&
      !bcrypt.compareSync(checkPassword, currentUser.hashedPassword)
    ) {
      return res.status(400).json({
        error: true,
        message: "Senha atual incorreta.",
      });
    }

    hashedPassword = bcrypt.hashSync(password, 10);
  }

  let token = currentUser.confirmationCode;

  if (email) {
    if (emailExists) {
      return res.status(401).json({
        error: true,
        message: "E-mail já cadastrado.",
      });
    }

    if (!token) {
      return res.status(401).json({
        error: true,
        message: "Oops, ocorreu um erro inesperado!",
      });
    }

    token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    req.body.accountVerified = false;
    nodemailer.sendConfirmationEmail(currentUser.username, email, token);
    res.status(200).json({
      error: false,
      message:
        "E-mail atualizado com sucesso. Por favor, cheque seu e-mail para reativá-lo.",
    });
  }

  if (isResetPassword) {
    token = jwt.sign({ email: email }, process.env.JWT_SECRET);
    id = currentUser.user_id;
  }

  await User.update(
    {
      username: username,
      email: email,
      hashedPassword: hashedPassword,
      isAdmin: isAdmin,
      isActive: isActive,
      accountVerified: req.body.accountVerified,
      confirmationCode: token,
    },
    {
      where: {
        user_id: id,
      },
    }
  )
    .then(() => {
      res.status(200).json({
        error: false,
        message: "Cadastro atualizado com sucesso.",
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: "Oops, ocorreu um erro: " + err,
      });
    });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;

  await User.destroy({
    where: {
      user_id: id,
    },
  })
    .then(() => {
      res.status(200).json({
        error: false,
        message: "Cadastro excluído com sucesso.",
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: "Oops, ocorreu um erro: " + err,
      });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
