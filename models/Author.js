const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
const Book = require("./Book");

const Author = sequelize.define("authors", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

// Author.hasMany(Book)

module.exports = Author;