const db = require("../services/db");

const ScheduleHour = db.sequelize.define("schedule_data", {
  _id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrementIdentity: true,
    autoIncrement: true,
  },
  hour: {
    type: db.Sequelize.TIME,
  },
});

// !Important: 'sync' and 'force:true' will drop the table with the specified columns in model
ScheduleHour.sync({force: true})

module.exports = ScheduleHour;
