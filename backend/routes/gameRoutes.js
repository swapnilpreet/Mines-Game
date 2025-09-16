const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const User = require("../models/User");

// Bomb & multiplier config
const bombProb = { easy: 0.02, medium: 0.25, hard: 0.6 };
const multipliers = { easy: 0.25, medium: 0.5, hard: 1 };

// Helper: Generate bombs
function generateBombs(gridSize, level) {
  const bombs = new Set();
  const count = Math.floor(gridSize * gridSize * bombProb[level]);
  while (bombs.size < count) {
    bombs.add(Math.floor(Math.random() * gridSize * gridSize));
  }
  return Array.from(bombs);
}

// Start a new game
router.post("/start", async (req, res) => {
  const { userId, level, investedMoney } = req.body;
  const gridSize = 5;

  const bombPositions = generateBombs(gridSize, level);

  const game = new Game({
    userId,
    level,
    investedMoney,
    bombPositions,
    clickedBoxes: [],
    currentMoney: 0,
    status: "active",
  });

  await game.save();
  res.json({ gameId: game._id, gridSize });
});

// Click a box
router.post("/click", async (req, res) => {
  const { gameId, boxIndex } = req.body;
  const game = await Game.findById(gameId);

  if (!game || game.status !== "active") return res.status(400).json({ message: "Invalid game" });

  if (game.clickedBoxes.includes(boxIndex))
    return res.status(400).json({ message: "Box already clicked" });

  game.clickedBoxes.push(boxIndex);

  if (game.bombPositions.includes(boxIndex)) {
    game.status = "lost";
    game.currentMoney = 0;
    await game.save();
    return res.json({ status: "bomb", currentMoney: 0 });
  } else {
    game.currentMoney += game.investedMoney * multipliers[game.level];
    await game.save();
    return res.json({ status: "safe", currentMoney: game.currentMoney });
  }
});

// Cash out
router.post("/cashout", async (req, res) => {
  const { gameId } = req.body;
  const game = await Game.findById(gameId);
  if (!game || game.status !== "active") return res.status(400).json({ message: "Invalid game" });

  game.status = "won";
  await game.save();

  const user = await User.findById(game.userId);
  user.balance += game.currentMoney;
  await user.save();

  res.json({ status: "cashed-out", finalMoney: game.currentMoney, balance: user.balance });
});

module.exports = router;
