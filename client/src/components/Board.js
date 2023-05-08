import Position from "./Position";
import { useState } from "react";
import "./Board.css";

// 2d array 6x7 matrix
// contains no state, just contains 42 positions
// use map function to render 6x7 Position components

// create 6 arrays, each array being a column

const Board = () => {
  const [board, setBoard] = useState([
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
  ]);

  function createRow(columnArray) {
    return (
      <>
        <Position cursorType="pointer" pieceColor={columnArray[0]} />
        <Position pieceColor={columnArray[1]} />
        <Position pieceColor={columnArray[2]} />
        <Position pieceColor={columnArray[3]} />
        <Position pieceColor={columnArray[4]} />
        <Position pieceColor={columnArray[5]} />
        <Position pieceColor={columnArray[6]} />
      </>
    );
  }

  // include event handlers in the board columns
  return (
    <div className="board">
      <div className="column-one column">{createRow(board[0])}</div>
      <div className="column-two column">{createRow(board[1])}</div>
      <div className="column-three column">{createRow(board[2])}</div>
      <div className="column-four column">{createRow(board[3])}</div>
      <div className="column-five column">{createRow(board[4])}</div>
      <div className="column-six column">{createRow(board[5])}</div>
    </div>
  );
};

export default Board;
