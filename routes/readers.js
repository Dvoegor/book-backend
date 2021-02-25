const express = require("express");
const router = express.Router();
const Reader = require("../models/Reader");

// add verifyToken to all routes!!!!!!!!!

router.get("/", (req, res) => {
  Reader.findAll({ raw: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Reader.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.post("/", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const fullName = req.body.fullName;
  const cardNumber = req.body.cardNumber;
  Reader.create({ full_name: fullName, card_number: cardNumber })
    .then(() => {
      res.send("Читатель добавлен");
    })
    .catch((err) => res.send(err));
});

router.patch("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const fullName = req.body.fullName;
  const cardNumber = req.body.cardNumber;
  const id = req.params.id;
  Reader.update(
    { full_name: fullName, card_number: cardNumber },
    { where: { id: id } }
  )
    .then(() => res.send("Читатель обновлен"))
    .catch((err) => res.send(err));
});

router.delete("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const id = req.params.id;
  Reader.destroy({ where: { id: id } })
    .then(() => res.send("Читатель удален"))
    .catch((err) => res.send(err));
});

module.exports = router;
