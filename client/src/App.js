import "./App.css";
import { useState, useEffect } from "react";
import socket from "./scripts/socketConnection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navigationBar/NavigationBar";
import ConnectionRoom from "./pages/connectionRoom/ConnectionRoom";
import BoardRoom from "./pages/boardRoom/BoardRoom";

function App() {
    /* MESSAGING */
    // keeps track of messages sent
    const [messages, setMessages] = useState([]);

    // adds new message the the messages state
    const addMessage = (message) => {
        setMessages([...messages, message]);
    };

    // when 'receive-message' is emitted, call addText
    socket.on("receive-message", (message) => {
        addMessage(message);
    });

    /* ROOM */
    // keeps track of current room and if joined
    // - if room is not set, then the user has not tried to join a room
    // - if !joined and room is set, then the user tried to join the room, but the room was full
    // - if joined and room is set, then the user successfully joined the room
    const [room, setRoom] = useState("");
    const [joined, setJoined] = useState(false);

    // indicates whether joining the room was a success or not
    socket.on("join-room-result", (success, room) => {
        setJoined(success);
        setRoom(room);
    });

    /* PLAYING */
    // keeps track of whether or not the player is in a game, and if it is their turn
    const [playing, setPlaying] = useState(false);
    const [turn, setTurn] = useState(false);

    // once room has two players, indicate that the clients are playing and determine the turn order
    socket.on("start-game", (goingFirst) => {
        setPlaying(true);
        setTurn(goingFirst);
    });

    // when opponent leaves the room, declare user as the winner
    socket.on("opponent-quit", () => {
        setPlaying(false);
        console.log(`${socket.id} WINS!`);
    });

    /* SERVER CONNECTION */
    // waits for socket connection to be established, only rendering main component once connected
    const [connected, setConnected] = useState(false);

    // when the room is connected to the server, change connection state to true
    useEffect(() => {
        socket.on("connect", () => {
            setConnected(true);
        });

        return () => {
            socket.off("connect");
        };
    }, []);

    // render laoding page while waiting for server connection
    if (!connected) {
        return (
            <div className="app">
                <BrowserRouter>
                    <NavigationBar />
                    <div>Connecting to Server...</div>;
                </BrowserRouter>
            </div>
        );
    }

    // render normal page when connected to server
    return (
        <div className="app">
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ConnectionRoom
                                messages={messages}
                                addMessage={addMessage}
                                room={room}
                                joined={joined}
                                setPlaying={setPlaying}
                            />
                        }
                    ></Route>
                    <Route
                        path="/board"
                        element={<BoardRoom room={room} joined={joined} playing={playing} turn={turn} />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
