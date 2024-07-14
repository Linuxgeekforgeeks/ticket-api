const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../getToken");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json("user already Taken");
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    const userData = await User({ username, password: hashPassword });
    const results = await userData.save();
    console.log(results)
    const token = generateAccessToken(results);
    // res.json({ message: "User Registered Sucessfully" });
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
});
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      res.status(400).json("User Does not Exists.");
    }
    const hashedPassword = existingUser.password;
    const isCorrectPass = await bcrypt.compare(password, hashedPassword);
    if (!isCorrectPass) {
      res.json({ message: "Wrong Credentials" });
    }
   const token= generateAccessToken(existingUser)
   res.json({token})
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
