const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const History = sequelize.define("history", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  book_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "books",
      key: "id",
    },
  },
  reader_id: {
    type: Sequelize.INTEGER,
    references: {
      model: "readers",
      key: "id",
    },
  },
  taking_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  returned_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
});

module.exports = History;
