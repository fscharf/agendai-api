const db = require("../services/db");

const User = db.sequelize.define("users", {
  user_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrementIdentity: true,
    autoIncrement: true,
  },
  username: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  hashedPassword: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
  },
  accountVerified: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  confirmationCode: {
    type: db.Sequelize.STRING,
    unique: true,
  },
  isActive: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  isAdmin: {
    type: db.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
});

// !Important: 'sync' and 'force:true' will drop the table with the specified columns in model
//User.sync({force: true})

module.exports = User;
