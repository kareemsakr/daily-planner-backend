const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");

const User = mongoose.model("User");

const router = express.Router();

router.use(requireAuth);

router.post("/push-token", async (req, res) => {
  try {
    req.user.pushToken = req.body.token;
    await req.user.save();
    return res.status(200).send({ message: "Push Token Saved." });
  } catch (error) {
    console.log(error.message);
    return res.status(422).send({ error: error.message });
  }
});

module.exports = router;
