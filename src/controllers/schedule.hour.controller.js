const ScheduleHour = require("../models/schedule.hour.model");

const get = async (req, res) => {
  await ScheduleHour.findAll({ where: { hour: req.query.hour } })
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const getById = async (req, res) => {
  const id = req.params.id;

  await ScheduleHour.findOne({
    where: {
      _id: id,
    },
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const create = async (req, res) => {
  const { hour } = req.body;

  await ScheduleHour.create({
    hour: hour,
  })
    .then(() =>
      res.status(200).send({ error: false, message: "Adicionado com sucesso!" })
    )
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const update = async (req, res) => {
  const id = req.params.id;
  const { hour } = req.body;

  await ScheduleHour.update(
    {
      hour: hour,
    },
    {
      where: {
        _id: id,
      },
    }
  )
    .then(() =>
      res.status(200).send({ error: false, message: "Atualizado com sucesso!" })
    )
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const destroy = async (req, res) => {
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
  get,
  getById,
  create,
  update,
  destroy,
};
