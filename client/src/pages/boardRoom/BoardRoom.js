import React from "react";
import "./BoardRoom.css";
import Board from "../../components/board/Board";

const BoardRoom = ({
    room,
    joined,
    playing,
    turn,
    setTurn,
    board,
    setBoard,
    openSlot,
    game,
    winnerMessage,
    setWinnerMessage,
}) => {
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
                    board={board}
                    setBoard={setBoard}
                    openSlot={openSlot}
                    game={game}
                    winnerMessage={winnerMessage}
                    setWinnerMessage={setWinnerMessage}
                ></Board>
            </main>
        </div>
    );
};

export default BoardRoom;
