import Position from "./Position";
import "./Board.css";

// 2d array 6x7 matrix
// contains no state, just contains 42 positions
// use map function to render 6x7 Position components

// create 6 arrays, each array being a column

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
    <>
      <div className="board">
        <div className="column-one column">{createRow()}</div>
        <div className="column-two column">{createRow()}</div>
        <div className="column-three column">{createRow()}</div>
        <div className="column-four column">{createRow()}</div>
        <div className="column-five column">{createRow()}</div>
        <div className="column-six column">{createRow()}</div>
      </div>
      <section className="game-status">pogchamp</section>
    </>
  );
};

export default Board;
