const { Sequelize } = require("sequelize");
const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;

const sequelize = new Sequelize("barber_shop_api", DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  define: {
    timestamps: false,
    freezeTableName: true,
    camelCase: false,
  },
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize,
};
