const { Sequelize } = require("sequelize");
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
const pg = require("pg");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
  define: {
    timestamps: false,
    freezeTableName: true,
    camelCase: false,
  },
});

var conString =
  "postgres://jjghjgeisymkam:5a07a683f279d29992de78b75f9e7a04e2b734cc04a831eeb3b0b454b948365b@ec2-52-4-171-132.compute-1.amazonaws.com:5432/des24b39usu0cf";
var client = new pg.Client(conString);
client.connect();

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
