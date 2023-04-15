const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
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
    ref: "user",
    required: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  waitingList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});

const EventModel = mongoose.model("event", EventSchema);

module.exports = { EventModel };
