import React from "react";
import "./BoardRoom.css";
import Board from "../../components/board/Board";

const BoardRoom = ({ room, joined, playing, turn, setTurn }) => {
    return (
        <div className="game-page">
            <main className="board-container">
                <Board
                    className="board"
                    room={room}
                    joined={joined}
                    playing={playing}
                    turn={turn}
                    setTurn={setTurn}
                ></Board>
            </main>
        </div>
    );
};

export default BoardRoom;
