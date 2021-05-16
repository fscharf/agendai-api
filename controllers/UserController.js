const bcrypt = require("bcrypt");
const User = require("../models/user.js");
let currentDate = new Date();

const getUsers = async (req, res) => {
  await User.findAll()
    .then(function (results) {
      res.status(200).json(results.rows);
    })
    .catch(function (err) {
      res.status(500).send("Ocorreu um erro inesperado." + err);
    });
};

const getUserById = async (req, res) => {
  const id = parseInt(req.params.id);

  await User.findByPk(id)
    .then(function (results) {
      res.status(200).json(results.rows);
    })
    .catch(function (err) {
      res.status(500).send("Ocorreu um erro inesperado." + err);
    });
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const { address, postal_code, district, city, phone1, phone2 } = "";

  const active = true;
  const account_verified = false;
  const user_type = "normal";
  const created_at = currentDate;

  const hashed_password = bcrypt.hashSync(password, 10);

  const emailExists = await User.findOne({ where: { email: email } });

  if (!name && !email && !password) {
    return res.status(400).json({
      error: true,
      message: "Por favor, preencha todos os campos.",
    });
  } else if (emailExists) {
    return res.status(401).json({
      error: true,
      message: "E-mail já cadastrado.",
    });
  } else {
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
    );
    res.status(200).send("Usuário adicionado com sucesso.");
  }
};

//Método precisa ser ajudado para validar corretamente
const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);

  const { name, email, address, postal_code, district, city, phone1, phone2 } =
    req.body;

  const active = true;
  const account_verified = false;
  const user_type = "normal";

  //const hashed_password = bcrypt.hashSync(password, 10);

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
    },
    {
      where: {
        user_id: id,
      },
    }
  );
  res.status(200).send("Usuário atualizado com sucesso.");
};

const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  await User.destroy({
    where: {
      user_id: id,
    },
  })
    .then(req, (res) => {
      res.status(200).send("usuário excluído com sucesso!");
    })
    .catch((err) => {
      res.status(401).send("Ocorreu um erro inesperado: " + err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
