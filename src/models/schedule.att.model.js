const db = require("../services/db");

const ScheduleAtt = db.sequelize.define("schedule_att", {
  _id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
});

// !Important: 'sync' and 'force:true' will drop the table with the specified columns in model
// ScheduleAtt.sync({ force: true });

module.exports = ScheduleAtt;
