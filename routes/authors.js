const express = require("express");
const router = express.Router();
const Author = require("../models/Author");

// add verifyToken to all routes!!!!!!!!!

router.get("/", (req, res) => {
  Author.findAll({ raw: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Author.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
});

router.post("/", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const name = req.body.name;
  Author.create({ name: name })
    .then(() => {
      res.send("Автор добавлен");
    })
    .catch((err) => res.send(err));
});

router.patch("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const name = req.body.name;
  const id = req.params.id;
  Author.update({ name: name }, { where: { id: id } })
    .then(() => res.send("Автор обновлен"))
    .catch((err) => res.send(err));
});

router.delete("/:id", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const id = req.params.id;
  Author.destroy({ where: { id: id } })
    .then(() => res.send("Автор удален"))
    .catch((err) => res.send(err));
});

module.exports = router;
