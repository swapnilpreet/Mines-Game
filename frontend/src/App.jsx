import React, { useState } from "react";
import { startGame, clickBox, cashOut } from "./api/gameApi";
import GridBoard from "./components/GridBoard";

function App() {
  const [level, setLevel] = useState("easy");
  const [investedMoney, setInvestedMoney] = useState(100);
  const [gameId, setGameId] = useState(null);
  const [gridSize, setGridSize] = useState(5);
  const [currentMoney, setCurrentMoney] = useState(0);
  const [clickedBoxes, setClickedBoxes] = useState([]);
  const [status, setStatus] = useState("idle"); // idle, active, lost

  const userId = "64f...replace_with_user_id"; // mock user

  const handleStart = async () => {
    const res = await startGame(userId, level, investedMoney);
    setGameId(res.data.gameId);
    setGridSize(res.data.gridSize);
    setCurrentMoney(0);
    setClickedBoxes([]);
    setStatus("active");
  };

  const handleClick = async (index) => {
    if (clickedBoxes.includes(index) || status !== "active") return;
    const res = await clickBox(gameId, index);
    setClickedBoxes([...clickedBoxes, index]);
    setCurrentMoney(res.data.currentMoney);
    if (res.data.status === "bomb") setStatus("lost");
  };

  const handleCashOut = async () => {
    const res = await cashOut(gameId);
    setCurrentMoney(res.data.finalMoney);
    setStatus("cashed-out");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mines Game</h1>

      {status === "idle" || status === "lost" || status === "cashed-out" ? (
        <div>
          <select value={level} onChange={(e) => setLevel(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <input
            type="number"
            value={investedMoney}
            onChange={(e) => setInvestedMoney(Number(e.target.value))}
          />
          <button onClick={handleStart}>Start Game</button>
        </div>
      ) : null}

      {status === "active" && (
        <>
          <h2>Current Money: ₹{currentMoney}</h2>
          <GridBoard size={gridSize} clickedBoxes={clickedBoxes} onBoxClick={handleClick} />
          <button onClick={handleCashOut}>Cash Out</button>
        </>
      )}

      {status === "lost" && <h2>You clicked a bomb! Game Over</h2>}
      {status === "cashed-out" && <h2>You cashed out ₹{currentMoney}</h2>}
    </div>
  );
}

export default App;
