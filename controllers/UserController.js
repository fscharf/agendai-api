const bcrypt = require("bcrypt");
const { JSON } = require("sequelize");
const User = require("../models/user");
let currentDate = new Date();

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
  const { name, email, password } = req.body;
  const { address, postal_code, district, city, phone1, phone2 } = "";

  const user_type = "normal";
  const created_at = currentDate;
  const account_verified = false;
  const active = true;

  const hashed_password = bcrypt.hashSync(password, 10);

  const emailExists = await User.findOne({ where: { email: email } });

  if (!name && !email && !password) {
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

  await User.create(
    {
      name: name,
      email: email,
      address: address,
      postal_code: postal_code,
      district: district,
      city: city,
      phone1: phone1,
      phone2: phone2,
      account_verified: account_verified,
      hashed_password: hashed_password,
      active: active,
      user_type: user_type,
      created_at: created_at,
    },
    {
      fields: [
        "name",
        "email",
        "address",
        "postal_code",
        "district",
        "city",
        "phone1",
        "phone2",
        "account_verified",
        "hashed_password",
        "active",
        "user_type",
        "created_at",
      ],
    }
  )
    .then(() => {
      res.status(200).json({
        error: false,
        message: "Usuário cadastrado com sucesso.",
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: "Oops, ocorreu um erro: " + err,
      });
    });
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);

  const {
    name,
    email,
    address,
    postal_code,
    district,
    city,
    phone1,
    phone2,
    password,
    checkPassword,
    account_verified,
    user_type,
    active,
  } = req.body;

  const currentUser = await User.findOne({ where: { user_id: id } });

  if (!bcrypt.compareSync(checkPassword, currentUser.hashed_password)) {
    return res.status(400).json({
      error: true,
      message: "Senha atual incorreta.",
    });
  }

  const hashed_password = bcrypt.hashSync(password, 10);

  await User.update(
    {
      name: name,
      email: email,
      address: address,
      postal_code: postal_code,
      district: district,
      city: city,
      phone1: phone1,
      phone2: phone2,
      account_verified: account_verified,
      active: active,
      user_type: user_type,
      hashed_password: hashed_password,
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
        message: "Usuário atualizado com sucesso.",
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
        message: "Usuário excluído com sucesso.",
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
