import Position from "../position/Position";
// import socket from "../../scripts/socketConnection";
import { useState, useRef, useEffect } from "react";
import "./Board.css";

// 2d array 6x7 matrix
// use map function to render 6x7 Position components
// each array is a board column

const addPiece = (piece) => {
  return [0, 1, "red", false];
  // return false;
};

const Board = ({ room, joined, playing, turn }) => {
  // socket.on("receive-move", (x, y, color, win) => {});

  // DEBUGGING
  const renderedTimes = useRef(0);
  useEffect(() => {
    console.log("rendered board");
    console.log(board);
    renderedTimes.current++;
    console.log(renderedTimes.current);
  });

  const [board, setBoard] = useState([
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
    ["white", "white", "white", "white", "white", "white", "white"],
  ]);

  const openSlot = useRef([0, 0, 0, 0, 0, 0]);
  const playable = useRef(turn); // need to make playable initally true for one user and false for another

  function createRow(columnArray) {
    return (
      <>
        <Position pieceColor={columnArray[0]} />
        <Position pieceColor={columnArray[1]} />
        <Position pieceColor={columnArray[2]} />
        <Position pieceColor={columnArray[3]} />
        <Position pieceColor={columnArray[4]} />
        <Position pieceColor={columnArray[5]} />
        <Position pieceColor={columnArray[6]} />
      </>
    );
  }

  // value of array is address for state, so using a new array re-renders but changing value of original array does not
  // !!! why is value of state and ref updated before the print statement???? not sure, but
  function reRenderBoard(x, y, color) {
    let changingBoard = board.slice();
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
    if (playable.current === false) {
      console.log("ended because not playable");
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

    // socket.emit("send-move", room, 0, 0, "red", false);

    const [x, y, color, win] = addedPosition;
    reRenderBoard(x, y, color);
    updateOpenSlot(x);

    // call checkWin()
    // if game is won, display a popup that states the player won and make Socket show a defeat screen to oponent
    // if game is not won, use Socket to display the updated Board to oponent and make playable = false

    if (win) {
    } else {
      // Person who makes move calls socket.emit(‘make-move’, position, color)
      // Person who receives move calls socket.on(‘make-move’, (position, colour) => { function });
      playable.current = false;
    }
  }

  return (
    <div className="board-container">
      <h3 className="turn-indicator">
        {joined
          ? playing
            ? turn
              ? `Playing in Room ${room}. Your Turn.`
              : `Playing in Room ${room}. Opponent's Turn.`
            : `Joined Room ${room}. Waiting for an opponent...`
          : "Join a Room to start playing!"}
      </h3>
      <div className="board">
        <div className="column-one column" onClick={() => updateBoard(0)}>
          {createRow(board[0])}
        </div>
        <div className="column-two column" onClick={() => updateBoard(1)}>
          {createRow(board[1])}
        </div>
        <div className="column-three column" onClick={() => updateBoard(2)}>
          {createRow(board[2])}
        </div>
        <div className="column-four column" onClick={() => updateBoard(3)}>
          {createRow(board[3])}
        </div>
        <div className="column-five column" onClick={() => updateBoard(4)}>
          {createRow(board[4])}
        </div>
        <div className="column-six column" onClick={() => updateBoard(5)}>
          {createRow(board[5])}
        </div>
      </div>
    </div>
  );
};

export default Board;
