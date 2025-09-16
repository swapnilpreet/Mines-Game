const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  balance: { type: Number, default: 1000 },
});

module.exports = mongoose.model("User", UserSchema);
