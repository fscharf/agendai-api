const pool = require("../services/db.js");

const getSchedule = (req, res) => {
  pool.query(
    "SELECT * FROM schedule ORDER BY id_schedule ASC",
    (err, results) => {
      if (err) {
        res.status(500).send("Ocorreu um erro inesperado: " + err);
      }
      res.status(200).json(results.rows);
    }
  );
};

const getScheduleById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(
    "SELECT * FROM schedule WHERE id_schedule = $1",
    [id],
    (err, results) => {
      if (err) {
        res.status(500).send("Ocorreu um erro inesperado: " + err);
      }
      res.status(200).json(results.rows);
    }
  );
};

const createSchedule = (req, res) => {
  const { date, hour, user_id } = req.body;
  //1-Concluído, 2-Em Andamento, 3-Cancelado
  const status = 2;

  pool.query(
    "INSERT INTO schedule (date, hour, status, user_id) VALUES ($1, $2, $3, $4)",
    [date, hour, status, user_id],
    (err, results) => {
      if (err) {
        res.status(500).send("Ocorreu um erro inesperado: " + err);
      }
      res.status(200).send("Agendamento efetuado com sucesso.");
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
