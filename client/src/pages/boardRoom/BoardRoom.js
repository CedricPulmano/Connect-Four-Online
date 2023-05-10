import React from "react";
import "./BoardRoom.css";
import Board from "../../components/board/Board";

const BoardRoom = () => {
    return (
        <div className="game-page">
            <main className="board-container">
                <Board className="board"></Board>
            </main>
        </div>
    );
};

export default BoardRoom;
