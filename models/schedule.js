const db = require("../services/db");
const User = require("./user");

const Schedule = db.sequelize.define("schedule", {
  id_schedule: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
  date: {
    type: db.Sequelize.DATEONLY,
  },
  hour: {
    type: db.Sequelize.TIME,
  },
  status: {
    type: db.Sequelize.BOOLEAN,
  },
  user_id: {
    type: db.Sequelize.INTEGER,
    references: User.user_id
  },
});

// !Important: 'sync' and 'force:true' will drop the table with the specified columns in model
// User.sync({force: true})

module.exports = Schedule;
