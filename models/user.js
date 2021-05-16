const db = require("../services/db");

const User = db.sequelize.define("users", {
  user_id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
  },
  name: {
    type: db.Sequelize.STRING,
  },
  hashed_password: {
    type: db.Sequelize.STRING,
  },
  email: {
    type: db.Sequelize.STRING,
  },
  address: {
    type: db.Sequelize.STRING,
  },
  postal_code: {
    type: db.Sequelize.STRING,
  },
  district: {
    type: db.Sequelize.STRING,
  },
  city: {
    type: db.Sequelize.STRING,
  },
  phone1: {
    type: db.Sequelize.STRING,
  },
  phone2: {
    type: db.Sequelize.STRING,
  },
  account_verified: {
    type: db.Sequelize.BOOLEAN,
  },
  active: {
    type: db.Sequelize.BOOLEAN,
  },
  user_type: {
    type: db.Sequelize.STRING,
  },
  created_at: {
    type: db.Sequelize.DATEONLY,
  }
});

// !Important: 'sync' and 'force:true' will drop the table with the specified columns in model
// User.sync({force: true})

module.exports = User;
