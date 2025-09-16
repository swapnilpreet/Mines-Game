const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  level: String,
  investedMoney: Number,
  bombPositions: [Number],
  clickedBoxes: [Number],
  currentMoney: { type: Number, default: 0 },
  status: { type: String, default: "active" },
});

module.exports = mongoose.model("Game", GameSchema);
