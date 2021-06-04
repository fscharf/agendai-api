const ScheduleHour = require("../models/schedule.hour.model");

const getScheduleHour = async (req, res) => {
  const getScheduleConditions = () => {
    var condition = {};

    if (req.query.date) {
      condition.date = req.query.date;
    }
    if (req.query.hour) {
      condition.hour = req.query.hour;
    }
    if (req.query.schedule_id) {
      condition.status = {
        [Op.eq]: req.query.schedule_id,
      };
    }
    if (req.query.user_id) {
      condition.user_id = {
        [Op.eq]: req.query.user_id,
      };
    }
    return condition;
  };

  await ScheduleHour.findAll({ where: getScheduleConditions(req) })
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const getScheduleHourById = async (req, res) => {
  const id = req.params.id;

  await ScheduleHour.findOne({
    where: {
      _id: id,
    },
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const createScheduleHour = async (req, res) => {
  const hour = req.body;

  await ScheduleHour.create({
    hour: hour,
  })
    .then(() =>
      res.status(200).send({ error: false, message: "Adicionado com sucesso!" })
    )
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const updateScheduleHour = async (req, res) => {
  const { hour, date, user_id, schedule_id } = req.body;

  const checkScheduleHour = await ScheduleHour.findOne({
    where: { hour: hour },
  });

  if (checkScheduleHour) {
    return res
      .status(400)
      .send({ error: true, message: "Hora já selecionada" });
  }

  await ScheduleHour.update(
    {
      hour: hour,
      date: date,
      user_id: user_id,
      schedule_id: schedule_id,
    },
    {
      where: {
        _id: id,
      },
    }
  )
    .then(() =>
      res.status(200).send({ error: false, message: "Adicionado com sucesso!" })
    )
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const deleteScheduleHour = async (req, res) => {
  const id = req.params.id;

  await ScheduleHour.destroy({
    where: {
      _id: id,
    },
  })
    .then(() =>
      res.status(200).send({ error: false, message: "Excluído com sucesso!" })
    )
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

module.exports = {
  getScheduleHour,
  getScheduleHourById,
  createScheduleHour,
  updateScheduleHour,
  deleteScheduleHour,
};
