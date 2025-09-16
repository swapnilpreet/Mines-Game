const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const gameRoutes = require("./routes/gameRoutes");

connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/game", gameRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
