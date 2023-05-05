import Position from "./Position";
import "./Board.css";

// 2d array 6x7 matrix
// contains no state, just contains 42 positions
// use map function to render 6x7 Position components

// create 6 arrays, each array being a row

const Board = () => {
  function createRow() {
    return (
      <>
        <Position />
        <Position />
        <Position />
        <Position />
        <Position />
        <Position />
        <Position />
      </>
    );
  }

  return (
    <div className="board">
      <div className="column-one">{createRow()}</div>
      <div className="column-two">{createRow()}</div>
      <div className="column-three">{createRow()}</div>
      <div className="column-four">{createRow()}</div>
      <div className="column-five">{createRow()}</div>
      <div className="column-six">{createRow()}</div>
    </div>
  );
};

export default Board;
