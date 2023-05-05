import React from "react";
import Board from "../../components/Board";

const BoardRoom = () => {
    return (
        <div className="game-page">
            <header className="game-header"></header>
            <main className="board-container">
                <Board className="board"></Board>
            </main>
            <footer className="game-footer"></footer>
        </div>
    );
};

export default BoardRoom;
