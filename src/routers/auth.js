const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    let newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    if (!req.body.email || !req.body.password) {
      return res.status(400).send("Please provide email and password");
    }

    await newUser.save();
    var payload = {
      email: newUser.email,
      id: newUser._id
    };

    var token = jwt.sign(payload, process.env.JWT_SECRET);
    return res.status(201).json({
      user: { email: newUser.email, id: newUser._id },
      token,
      msg: "User was succesfully created"
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(405).send("Incorrect username or password");
    }
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      var payload = {
        email: user.email,
        id: user._id
      };

      var token = jwt.sign(payload, process.env.JWT_SECRET);
      return res.status(201).json({
        user: { email: user.email, id: user._id },
        token,
        msg: "User was succesfully logged in."
      });
    } else {
      return res.status(405).send("Incorrect username or password");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
});

module.exports = router;
