const ScheduleHour = require("../models/schedule.hour.model");

const getScheduleHour = (req, res) => {
  ScheduleHour.findAll()
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const createScheduleHour = (req, res) => {
  const hour = req.body.hour;

  ScheduleHour.create({
    hour: hour,
  })
    .then(() => res.status(200))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const deleteScheduleHour = (req, res) => {
  const id = req.params.id;

  ScheduleHour.destroy({
    where: {
      _id: id,
    },
  })
    .then(() => res.status(200))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

module.exports = {
  getScheduleHour,
  createScheduleHour,
  deleteScheduleHour,
};
