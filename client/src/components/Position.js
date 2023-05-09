import { useState } from "react";
import "./Position.css";

const Position = ({ pieceColor, cursorType }) => {
  if (cursorType === undefined) {
    cursorType = "default";
  }

  return (
    <div className="position-space">
      <div
        className="piece"
        style={{ backgroundColor: pieceColor, cursor: cursorType }}
      ></div>
    </div>
  );
};

export default Position;
