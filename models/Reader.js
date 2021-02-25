const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const Reader = sequelize.define("readers", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  full_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  card_number: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Reader;