import "./ConnectionRoom.css";
// import { useState, useEffect } from "react";
import InputFields from "../../components/inputFields/InputFields";
import socket from "../../scripts/socketConnection";

const ConnectionRoom = ({ messages, addMessage }) => {
    return (
        <div className="connection-room" id="Connection-Room">
            <h1 id="Connection">Connected with ID: {socket.id}</h1>
            <InputFields socket={socket} addMessage={addMessage} />
            <div id="Messages">
                <h2>Messages</h2>
                {messages.map((message, index) => {
                    return <h4 key={index}>{message}</h4>;
                })}
            </div>
        </div>
    );
};

export default ConnectionRoom;
