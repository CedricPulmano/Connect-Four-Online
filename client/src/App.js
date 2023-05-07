import "./App.css";
import { displayConnection, addText } from "./scripts/script";
import { io } from "socket.io-client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ConnectionRoom from "./pages/connectionRoom/ConnectionRoom";
import BoardRoom from "./pages/boardRoom/BoardRoom";

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
    <div className="app">
      <BrowserRouter>
        <div className="nav-container">
          <Link to="/" className="nav-link">
            Connect to a Room
          </Link>
          <Link to="/board" className="nav-link">
            Go to Board
          </Link>
        </div>
        <Routes>
          <Route
            path="/"
            element={<ConnectionRoom socket={socket} socketID={socket.id} />}
          ></Route>
          <Route path="/board" element={<BoardRoom />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
