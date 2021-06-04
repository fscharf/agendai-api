const db = require("../services/db");
const Schedule = require("./schedule.model");
const User = require("./user.model");

const ScheduleHour = db.sequelize.define("schedule_hour", {
  _id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrementIdentity: true,
    autoIncrement: true,
  },
  hour: {
    type: db.Sequelize.TIME,
  },
  date: {
    type: db.Sequelize.DATEONLY,
  },
  description: {
    type: db.Sequelize.STRING,
  }
});

ScheduleHour.belongsTo(User, {
  foreignKey: "user_id",
});

ScheduleHour.belongsTo(Schedule, {
  foreignKey: "schedule_id",
});

// !Important: 'sync' and 'force:true' will drop the table with the specified columns in model
ScheduleHour.sync({ force: true });

module.exports = ScheduleHour;
