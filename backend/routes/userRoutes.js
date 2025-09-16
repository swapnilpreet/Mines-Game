// backend/routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create test user
router.post("/create", async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.json(user);
});

module.exports = router;
