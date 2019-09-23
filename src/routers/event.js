const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middleware/requireAuth");

const Event = mongoose.model("Event");

const router = express.Router();

router.use(requireAuth);

router.get("./events", async (req, res) => {
  const event = await Event.find({ userId: req.user._id });
  return res.send(event);
});

router.post("/events", async (req, res) => {
  try {
    const { title, datetime } = req.body;
    if (!title || !datetime) {
      return res
        .status(422)
        .send({ error: "Please provide a title and datetime" });
    }

    const event = new Event({ title, datetime, userId: req.user._id });
    await event.save();
    return res.send(event);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

router.delete("/events/:eventId", async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.eventId, userId: req.user._id });
    return res.status(200).send({ message: "Event deleted" });
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
});

router.put("/events/:eventId", async (req, res) => {
  try {
    await Event.updateOne(
      { _id: req.params.eventId, userId: req.user._id },
      req.body
    );
  } catch (error) {
    return res.status(422).send({ error: error.message });
  }
});

module.exports = router;
