const ScheduleAtt = require("../models/schedule.att.model");

const get = async (req, res) => {
  const { description } = req.query;

  const getQueryParams = () => {
    var condition = {};

    if (description) {
      condition.description = description;
    }
    return condition;
  };

  await ScheduleAtt.findAll({ where: getQueryParams(req) })
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const getById = async (req, res) => {
  const id = req.params.id;

  await ScheduleAtt.findOne({
    where: {
      _id: id,
    },
  })
    .then((result) => res.status(200).send(result))
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const create = async (req, res) => {
  const { description } = req.body;

  await ScheduleAtt.create({
    description: description,
  })
    .then(() =>
      res.status(200).send({ error: false, message: "Adicionado com sucesso!" })
    )
    .catch((err) => res.status(400).send({ error: true, message: err }));
};

const update = async (req, res) => {
  const { description } = req.body;
  const id = req.params.id;

  await ScheduleAtt.update(
    {
      description: description,
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

  await ScheduleAtt.destroy({
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
