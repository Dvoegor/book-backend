const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Author = require("../models/Author");

// add verifyToken to all routes!!!!!!!!!

router.get("/", (req, res) => {
  Book.findAll()
    .then((book) => {
      res.send(book);
    })
    .catch((err) => res.send(err));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Book.findByPk(id)
    .then((book) => {
      res.send(book);
    })
    .catch((err) => res.send(err));
});

router.post("/", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const author = req.body.author;
  const title = req.body.title;
  const publishing_house = req.body.publishing_house;
  const year = req.body.year;
  const ISBN = req.body.ISBN;
  const pages = req.body.pages;
  const type = req.body.type;
  const location = req.body.location;
  const state = req.body.state;
  Book.create({
    author: author,
    title: title,
    publishing_house: publishing_house,
    year: year,
    ISBN: ISBN,
    pages: pages,
    type: type,
    location: location,
    state: state,
  })
    .then(() => {
      res.send("Книга добавлена");
    })
    .catch((err) => res.send(err));
});

router.patch("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const author = req.body.author;
  const title = req.body.title;
  const publishing_house = req.body.publishing_house;
  const year = req.body.year;
  const ISBN = req.body.ISBN;
  const pages = req.body.pages;
  const type = req.body.type;
  const location = req.body.location;
  const state = req.body.state;
  const id = req.params.id;
  Book.update(
    {
      author: author,
      title: title,
      publishing_house: publishing_house,
      year: year,
      ISBN: ISBN,
      pages: pages,
      type: type,
      location: location,
      state: state,
    },
    { where: { id: id } }
  )
    .then(() => res.send("Книга обновлена"))
    .catch((err) => res.send(err));
});

router.delete("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const id = req.params.id;
  Book.destroy({ where: { id: id } })
    .then(() => res.send("Книга удалена"))
    .catch((err) => res.send(err));
});

module.exports = router;
