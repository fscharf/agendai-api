const pool = require("../services/db");
const Schedule = require("../models/schedule");
const { Op } = require("sequelize");
const User = require("../models/user");

const getSchedule = async (req, res) => {
  await Schedule.findAll()
    .then(function (results) {
      res.status(200).send(results);
    })
    .catch(function (err) {
      res.status(500).send("Ocorreu um erro inesperado." + err);
    });
};

const getScheduleById = async (req, res) => {
  const id = parseInt(req.params.id);

  await Schedule.findOne({ where: { id_schedule: id } })
    .then(function (result) {
      res.status(200).send(result);
    })
    .catch(function (err) {
      res.status(500).send("Ocorreu um erro inesperado." + err);
    });
};

const createSchedule = async (req, res) => {
  const { date, hour, user_id } = req.body;
  //1-Concluído, 2-Em Andamento, 3-Cancelado
  const status = parseInt(2);

  const allSchedule = await Schedule.findOne({
    where: {
      date: date,
      hour: hour,
    },
  });

  const checkUser = await User.findOne({
    where: {
      user_id: user_id,
    },
  });

  if (!checkUser.account_verified) {
    return res.status(400).json({
      error: true,
      message: "Você precisa confirmar seu e-mail para agendar.",
    });
  }
  if (allSchedule && allSchedule.status == 2) {
    return res.status(401).json({
      error: true,
      message: "Data ou Hora já selecionada.",
    });
  }

  await Schedule.create(
    {
      date: date,
      hour: hour,
      status: status,
      user_id: user_id,
    },
    {
      fields: ["date", "hour", "status", "user_id"],
    }
  );
};

const updateSchedule = (req, res) => {
  const id = parseInt(req.params.id);
  const { date, hour, status } = req.body;

  pool.query(
    `UPDATE schedule SET date = $1, hour = $2, status = $3 WHERE id_schedule = $4`,
    [date, hour, status, id],
    (err, results) => {
      if (err) {
        res.status(500).send("Ocorreu um erro inesperado: " + err);
      }
      res.status(200).json(results.rows);
    }
  );
};

const deleteSchedule = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "DELETE FROM schedule WHERE id_schedule = $1",
    [id],
    (err, results) => {
      if (err) {
        res.status(500).send("Ocorreu um erro inesperado: " + err);
      }
      res.status(200).send(`Usuário excluído com ID: ${id}`);
    }
  );
};

module.exports = {
  getSchedule,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
