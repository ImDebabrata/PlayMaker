const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  timings: {
    type: Date,
    require: true,
  },
  playerLimit: {
    type: Number,
    require: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const EventModel = mongoose.model("event", EventSchema);

module.exports = { EventModel };
