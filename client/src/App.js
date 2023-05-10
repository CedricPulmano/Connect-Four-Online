import "./App.css";
import { useState, useEffect } from "react";
import socket from "./scripts/socketConnection";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/navigationBar/NavigationBar";
import ConnectionRoom from "./pages/connectionRoom/ConnectionRoom";
import BoardRoom from "./pages/boardRoom/BoardRoom";

function App() {
    // when 'receive-message' is emitted, call addText
    socket.on("receive-message", (message) => {
        addMessage(message);
    });

    // keeps track of messages sent
    const [messages, setMessages] = useState([]);

    // adds new message the the messages state
    const addMessage = (message) => {
        setMessages([...messages, message]);
    };

    // keeps track of current room and if joined
    // - if room is not set, then the user has not tried to join a room
    // - if not joined and room is set, then the user tried to join the room, but the room was full
    // - if joined and room is set, then the user successfully joined the room
    const [room, setRoom] = useState("");
    const [joined, setJoined] = useState(false);

    // indicates whether joining the room was a success or not
    socket.on("join-room-result", (success, room) => {
        if (!success) {
            setRoom(room);
            setJoined(false);
            return;
        }
        setRoom(room);
        setJoined(true);
    });

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
                            <ConnectionRoom messages={messages} room={room} joined={joined} addMessage={addMessage} />
                        }
                    ></Route>
                    <Route path="/board" element={<BoardRoom />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
