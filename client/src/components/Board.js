import Position from "./Position";
import { useState, useRef } from "react";
import "./Board.css";

// 2d array 6x7 matrix
// use map function to render 6x7 Position components
// each array is a board column

const Board = () => {
  const [board, setBoard] = useState([
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
  ]);

  const openSlot = useRef([0, 0, 0, 0, 0, 0]);
  const playable = useRef(true); // need to make playable initally true for one user and false for another

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

  function reRenderBoard(x, y, color) {
    let changingBoard = board;
    changingBoard[x][y] = color;
    setBoard(changingBoard);
  }

  function updateOpenSlot(columnNumber) {
    let changingOpenSlot = openSlot.current;
    changingOpenSlot[columnNumber]++;
    openSlot.current = changingOpenSlot;
  }

  function updateBoard(columnNumber) {
    // board must be currently playable
    if (!playable) {
      return;
    }
    // call addPiece()
    // if addPiece does not work, do not update the board and exit the function
    // if addPiece does work, update the board and continue with this function
    // !!! IMPORT MALCOLM's FUNCTIONS
    const addedPosition = addPiece(columnNumber);
    if (addedPosition === false) {
      return;
    }

    const [x, y, color] = addedPosition;
    reRenderBoard(x, y, color);
    updateBoard(x);

    // call checkWin()
    // if game is won, display a popup that states the player won and make Socket show a defeat screen to oponent
    // if game is not won, use Socket to display the updated Board to oponent and make playable = false

    const gameWon = checkWin(x, y);
    if (gameWon) {
    } else {
      // Person who makes move calls socket.emit(‘make-move’, position, color)
      // Person who receives move calls socket.on(‘make-move’, (position, colour) => { function });
      playable.current = false;
    }
  }

  return (
    <div className="board">
      <div className="column-one column" onClick={() => updateBoard(1)}>
        {createRow(board[0])}
      </div>
      <div className="column-two column" onClick={() => updateBoard(2)}>
        {createRow(board[1])}
      </div>
      <div className="column-three column" onClick={() => updateBoard(3)}>
        {createRow(board[2])}
      </div>
      <div className="column-four column" onClick={() => updateBoard(4)}>
        {createRow(board[3])}
      </div>
      <div className="column-five column" onClick={() => updateBoard(5)}>
        {createRow(board[4])}
      </div>
      <div className="column-six column" onClick={() => updateBoard(6)}>
        {createRow(board[5])}
      </div>
    </div>
  );
};

export default Board;
