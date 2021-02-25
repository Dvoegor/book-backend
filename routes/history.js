const express = require("express");
const router = express.Router();
const History = require("../models/History");
const Reader = require("../models/Reader");
const Book = require("../models/Book");

// add verifyToken to all routes!!!!!!!!!

router.get("/", async (req, res) => {
  let history, books, readers;
  await History.findAll({ raw: true }).then((data) => {
    history = data;
  });

  books = history.map((item) => item.book_id);
  readers = history.map((item) => item.reader_id);

  async function getBooks() {
    for (let index = 0; index < books.length; index++) {
      await Book.findByPk(books[index]).then((bookData) => {
        books[index] = bookData.title;
      });
    }
  }
  async function getReaders() {
    for (let index = 0; index < readers.length; index++) {
      await Reader.findByPk(readers[index]).then((readerData) => {
        readers[index] = readerData.card_number;
      });
    }
  }
  async function sendData() {
    res.send(newHistory);
  }

  await getReaders();
  await getBooks();
  const newHistory = history.map((item, index) => ({
    id: item.id,
    book_id: item.book_id,
    reader_id: item.reader_id,
    taking_date: item.taking_date,
    returned_date: item.returned_date,
    book: books[index],
    reader: readers[index],
  }));
  await sendData();
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  History.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.post("/", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const book_id = req.body.book_id;
  const reader_id = req.body.reader_id;
  const taking_date = req.body.taking_date;
  const returned_date = req.body.returned_date;
  History.create({
    book_id: book_id,
    reader_id: reader_id,
    taking_date: taking_date,
    returned_date: returned_date,
  })
    .then(() => {
      res.send("Запись добавлена");
    })
    .catch((err) => res.send(err));
});

router.patch("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const book_id = req.body.book_id;
  const reader_id = req.body.reader_id;
  const taking_date = req.body.taking_date;
  const returned_date = req.body.returned_date;
  const id = req.params.id;
  History.update(
    { book_id: book_id, reader_id: reader_id, taking_date: taking_date, returned_date: returned_date },
    { where: { id: id } }
  )
    .then(() => res.send("Запись обновлена"))
    .catch((err) => res.send(err));
});

router.delete("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const id = req.params.id;
  History.destroy({ where: { id: id } })
    .then(() => res.send("Запись удалена"))
    .catch((err) => res.send(err));
});

module.exports = router;
