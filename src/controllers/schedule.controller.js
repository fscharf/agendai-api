const Schedule = require("../models/schedule.model");
const User = require("../models/user.model");
const { Op } = require("sequelize");
const ScheduleHour = require("../models/schedule.hour.model");

const getSchedule = async (req, res) => {
  const { date, hour, status, user_id, schedule_hour_id } = req.query;

  const getQueryParams = (req) => {
    var condition = {};

    if (date) {
      condition.date = date;
    }
    if (hour) {
      condition.hour = hour;
    }
    if (status) {
      condition.status = {
        [Op.eq]: status,
      };
    }
    if (user_id) {
      condition.user_id = user_id;
    }
    if (schedule_hour_id) {
      condition.schedule_hour_id = schedule_hour_id;
    }
    return condition;
  };

  const errorMsg = "Oops, ocorreu um erro: ";

  await Schedule.findAll({
    where: getQueryParams(),
  })
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: errorMsg + err,
      });
    });
};

const getScheduleById = async (req, res) => {
  const id = parseInt(req.params.id);

  await Schedule.findOne({ where: { schedule_id: id } })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: errorMsg + err,
      });
    });
};

const createSchedule = async (req, res) => {
  const { date, hour, user_id, description } = req.body;

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

  const checkHour = await ScheduleHour.findOne({
    where: {
      hour: hour,
    },
  });

  if (!checkUser.accountVerified) {
    return res.status(400).json({
      error: true,
      message: "Você precisa confirmar seu e-mail para agendar.",
    });
  }

  if (allSchedule && allSchedule.status) {
    return res.status(401).json({
      error: true,
      message: "Data ou Hora já selecionada.",
    });
  }

  await Schedule.create({
    date: date,
    hour: hour,
    description: description,
    user_id: user_id,
    schedule_hour_id: checkHour._id,
  })
    .then(() => {
      res.status(200).json({
        error: false,
        message: "Agendamento efetuado com sucesso.",
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: errorMsg + err,
      });
    });
};

const updateSchedule = async (req, res) => {
  const id = parseInt(req.params.id);
  const { date, hour, status, description } = req.body;

  await Schedule.update(
    {
      date: date,
      hour: hour,
      description: description,
      status: status,
    },
    {
      where: {
        schedule_id: id,
      },
    }
  )
    .then(() => {
      res.status(200).json({
        error: false,
        message: "Agendamento atualizado com sucesso.",
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: errorMsg + err,
      });
    });
};

const deleteSchedule = async (req, res) => {
  const id = parseInt(req.params.id);

  await Schedule.destroy({
    where: {
      schedule_id: id,
    },
  })
    .then(() => {
      res.status(200).json({
        error: false,
        message: "Agendamento excluído com sucesso.",
      });
    })
    .catch((err) => {
      res.status(401).json({
        error: true,
        message: errorMsg + err,
      });
    });
};

module.exports = {
  getSchedule,
  getScheduleById,
  createSchedule,
  updateSchedule,
  deleteSchedule,
};
