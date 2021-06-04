const db = require("../services/db");
const User = require("./user");

const Schedule = db.sequelize.define("schedule", {
  schedule_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrementIdentity: true,
    autoIncrement: true,
  },
  date: {
    type: db.Sequelize.DATEONLY,
    allowNull: false,
  },
  hour: {
    type: db.Sequelize.TIME,
    allowNull: false,
  },
  description: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

Schedule.belongsTo(User, {
  foreignKey: "user_id",
});

// !Important: 'sync' and 'force:true' will drop the table with the specified columns in model
// Schedule.sync({force: true})
//

module.exports = Schedule;
