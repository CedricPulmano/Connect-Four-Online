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

    const [room, setRoom] = useState("");

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
                            <ConnectionRoom messages={messages} room={room} addMessage={addMessage} setRoom={setRoom} />
                        }
                    ></Route>
                    <Route path="/board" element={<BoardRoom />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
