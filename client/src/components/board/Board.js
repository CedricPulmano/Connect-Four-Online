import Position from "../position/Position";
import socket from "../../scripts/socketConnection";
import { useState, useRef } from "react";
import "./Board.css";
import { Game } from "../../Game";

// 2d array 6x7 matrix
// use map function to render 6x7 Position components
// each array is a board column

const Board = ({ room, joined, playing, turn, setTurn }) => {
    socket.off("receive-move").on("receive-move", (x, y, color, win) => {
        console.log("Received move", x, y, color, win);
        reRenderBoard(x, y, color);
        updateOpenSlot(x);
        game.current.addPiece(x);
        setTurn(true);
        if (win) {
            displayWin("You Lost");
            setTurn(false);
        }
    });

    // DEBUGGING
    /*
    const renderedTimes = useRef(0);
    useEffect(() => {
        console.log("rendered board");
        console.log(board);
        renderedTimes.current++;
        console.log(renderedTimes.current);
    });
    */

    const [board, setBoard] = useState([
        ["white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white"],
        ["white", "white", "white", "white", "white", "white"],
    ]);

    const openSlot = useRef([5, 5, 5, 5, 5, 5, 5]);
    const game = useRef(new Game());

    function createColumn(columnArray) {
        return (
            <>
                <Position pieceColor={columnArray[0]} />
                <Position pieceColor={columnArray[1]} />
                <Position pieceColor={columnArray[2]} />
                <Position pieceColor={columnArray[3]} />
                <Position pieceColor={columnArray[4]} />
                <Position pieceColor={columnArray[5]} />
            </>
        );
    }

    // value of array is address for state, so using a new array re-renders but changing value of original array does not
    // !!! why is value of state and ref updated before the print statement???? not sure, but
    function reRenderBoard(x, y, color) {
        let changingBoard = board.slice();
        let newY = openSlot.current[x];
        changingBoard[x][newY] = color;
        setBoard(changingBoard);
    }

    function updateOpenSlot(columnNumber) {
        let changingOpenSlot = openSlot.current;
        changingOpenSlot[columnNumber]--;
        openSlot.current = changingOpenSlot;
    }

    function displayWin(message) {
        console.log(message);
    }

    function updateBoard(columnNumber) {
        // board must be currently playable
        if (!turn) {
            console.log("Not your turn, wait for opponent to make a move");
            return;
        }

        // call addPiece()
        const addedPosition = game.current.addPiece(columnNumber);
        if (addedPosition === false) {
            return;
        }

        // use information from addPiece to update states
        const [x, y, color, win] = addedPosition;
        reRenderBoard(x, y, color);
        updateOpenSlot(x);
        setTurn(false);
        socket.emit("send-move", room, x, y, color, win);

        if (win) {
            displayWin("You won!");
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
                <div className="column-zero column" onClick={() => updateBoard(0)}>
                    {createColumn(board[0])}
                </div>
                <div className="column-one column" onClick={() => updateBoard(1)}>
                    {createColumn(board[1])}
                </div>
                <div className="column-two column" onClick={() => updateBoard(2)}>
                    {createColumn(board[2])}
                </div>
                <div className="column-three column" onClick={() => updateBoard(3)}>
                    {createColumn(board[3])}
                </div>
                <div className="column-four column" onClick={() => updateBoard(4)}>
                    {createColumn(board[4])}
                </div>
                <div className="column-five column" onClick={() => updateBoard(5)}>
                    {createColumn(board[5])}
                </div>
                <div className="column-six column" onClick={() => updateBoard(6)}>
                    {createColumn(board[6])}
                </div>
            </div>
        </div>
    );
};

export default Board;
