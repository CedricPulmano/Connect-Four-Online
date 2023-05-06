import "./App.css";
import { useState } from "react";
import { displayConnection } from "./scripts/script";
import socket from "./scripts/socketConnection";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ConnectionRoom from "./pages/connectionRoom/ConnectionRoom";
import BoardRoom from "./pages/boardRoom/BoardRoom";

// when first connecting to server, call displayConnection
socket.on("connect", () => {
    displayConnection(`Connection ID: ${socket.id}`);
});

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

    return (
        <div className="app">
            <BrowserRouter>
                <div className="nav-links">
                    <Link to="/" className="nav-link">
                        Connect to a Room
                    </Link>
                    <Link to="/board" className="nav-link">
                        Go to Board
                    </Link>
                </div>
                <Routes>
                    <Route path="/" element={<ConnectionRoom messages={messages} addMessage={addMessage} />}></Route>
                    <Route path="/board" element={<BoardRoom />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
