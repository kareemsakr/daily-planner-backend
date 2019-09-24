const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    title: {
      type: String,
      required: true
    },
    datetime: Date
  },
  { timestamps: true }
);

mongoose.model("Event", EventSchema);
