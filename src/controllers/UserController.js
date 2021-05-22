const bcrypt = require("bcrypt");
const User = require("../models/user");
const nodemailer = require("../services/config");

var jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  await User.findAll()
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
  const id = parseInt(req.params.id);

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

  const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);

  await User.create({
    username: username,
    email: email,
    hashedPassword: hashedPassword,
    confirmationCode: token,
  })
    .then(() => {
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
  const id = parseInt(req.params.id);

  const { username, email, password, checkPassword, isAdmin, isActive } = req.body;

  const currentUser = await User.findOne({ where: { user_id: id } });

  if (!bcrypt.compareSync(checkPassword, currentUser.hashedPassword)) {
    return res.status(400).json({
      error: true,
      message: "Senha atual incorreta.",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  await User.update(
    {
      username: username,
      email: email,
      hashedPassword: hashedPassword,
      isAdmin: isAdmin,
      isActive: isActive,
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
  const id = parseInt(req.params.id);

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
