const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Profile = require("../models/Profile")

router.get("/", (req, res) => {
  res.status(200).send("auth");
});

router.post("/", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const profile = await Profile.findAll({where: {email: email, password: password}, raw: true})
    const admin = profile[0]
    if (!admin) {
        return res.status(200).send("Неверные данные");
    }
    const adminId = admin.id
    // res.status(200).send(`${adminId}`);
    const token = jwt.sign({ _id: adminId }, process.env.TOKEN_SECRET)
    res.setHeader('auth-token', token);
    if (password === 'admin') {
      res.setHeader('admin', 'true');
    } else {
      res.setHeader('admin', 'false');
    }
    res.status(200).send("Верные данные")
});

module.exports = router;
