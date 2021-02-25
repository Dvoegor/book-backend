const Sequelize = require("sequelize");
const sequelize = require("../sequelize");
const Author = require("./Author");

const Book = sequelize.define(
  "books",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publishing_house: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    ISBN: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    pages: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  { underscored: true }
);

// Book.hasOne(Author)

module.exports = Book;
