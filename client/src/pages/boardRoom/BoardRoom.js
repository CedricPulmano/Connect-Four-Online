import React from "react";
import "./BoardRoom.css";
import Board from "../../components/board/Board";

const BoardRoom = ({ room, joined, playing, turn }) => {
    return (
        <div className="game-page">
            <main className="board-container">
                <Board className="board" room={room} joined={joined} playing={playing} turn={turn}></Board>
            </main>
        </div>
    );
};

export default BoardRoom;
