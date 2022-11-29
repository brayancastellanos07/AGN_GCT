const { Sequelize } = require("sequelize");
const { db } = require("../config");

const sequelize = new Sequelize(
  `${db.dialect}://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`,
  {
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
