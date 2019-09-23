const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  title: {
    type: String,
    required: true
  },
  dateTime: Date
});

mongoose.model("Event", EventSchema);
