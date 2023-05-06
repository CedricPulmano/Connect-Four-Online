import React, { useState } from "react";
import socket from "../../scripts/socketConnection";

const InputFields = ({ addMessage }) => {
    // sets up and updates the state of the 'room' and 'message' fields as the text input changes
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const handleRoomChange = (event) => {
        setRoom(event.target.value);
    };
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    // when 'Join Room' button is clicked, sends request to join room
    const joinRoom = () => {
        socket.emit("join-room", room);
    };

    // when 'Send Message' button is clicked, sends request to send a message to all sockets in the room
    const sendMessage = () => {
        socket.emit("send-message", message, room);
        addMessage(message);
        setMessage("");
    };

    return (
        <div>
            <div className="room">
                <input type="text" value={room} onChange={handleRoomChange} />
                <button onClick={joinRoom}>Join a Room</button>
            </div>
            <div className="message">
                <input type="text" value={message} onChange={handleMessageChange} />
                <button onClick={sendMessage}>Send a Message</button>
            </div>
        </div>
    );
};

export default InputFields;
