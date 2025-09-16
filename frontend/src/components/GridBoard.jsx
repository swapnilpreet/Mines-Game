import React from "react";

const GridBoard = ({ size, clickedBoxes, onBoxClick }) => {
  const totalBoxes = size * size;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 60px)`,
        gap: "5px",
        margin: "20px 0",
      }}
    >
      {Array.from({ length: totalBoxes }).map((_, index) => (
        <div
          key={index}
          onClick={() => onBoxClick(index)}
          style={{
            width: "60px",
            height: "60px",
            backgroundColor: clickedBoxes.includes(index) ? "#4caf50" : "#ccc",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {clickedBoxes.includes(index) ? "★" : ""}
        </div>
      ))}
    </div>
  );
};

export default GridBoard;
