const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  dateTime: Date
});

mongoose.model("Event", EventSchema);
