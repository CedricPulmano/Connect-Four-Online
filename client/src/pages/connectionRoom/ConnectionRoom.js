import React from "react";
import "./ConnectionRoom.css";
import InputFields from "../../components/inputFields/InputFields";

const ConnectionRoom = ({ socket, socketID }) => {
    return (
        <div className="connection-room" id="Connection-Room">
            <h1 id="Connection">Connected with ID: {socketID}</h1>
            <div id="Messages">
                <h2>Messages</h2>
            </div>
            <InputFields socket={socket} />
        </div>
    );
};

export default ConnectionRoom;
