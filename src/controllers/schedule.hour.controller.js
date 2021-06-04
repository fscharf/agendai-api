const ScheduleHour = require("../models/schedule.hour.model");

const getScheduleHour = async (req, res) => {
  await ScheduleHour.findAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const createScheduleHour = async (req, res) => {
  const hour = req.body.hour;

  await ScheduleHour.create({
    hour: hour,
  })
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
  createScheduleHour,
  deleteScheduleHour,
};
