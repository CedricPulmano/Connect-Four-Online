import "./App.css";
import Button from "./components/inputFields/InputFields";
import { displayConnection, addText } from "./scripts/script";
import { io } from "socket.io-client";

// connects to server at port 8080
const socket = io("http://localhost:8080");

// when first connecting to server, call displayConnection
socket.on("connect", () => {
    displayConnection(`Connection ID: ${socket.id}`);
});

// when 'receive-message' is emitted, call addText
socket.on("receive-message", (message) => {
    addText(message, "Messages");
});

function App() {
    return (
        <div className="App" id="App">
            <h1 id="Connection">Hi</h1>
            <div id="Messages">
                <h2>Messages</h2>
            </div>
            <Button socket={socket} />
        </div>
    );
}

export default App;
