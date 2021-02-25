const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const verifyToken = require("./verifyToken")

router.get("/", verifyToken, (req, res) => {
  res.send("Index")
});

module.exports = router;
