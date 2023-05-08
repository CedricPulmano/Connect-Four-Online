import React, { useState } from "react";
import "./InputFields.css";
import socket from "../../scripts/socketConnection";

const InputFields = ({ addMessage, setRoom, room }) => {
    // sets up and updates the state of the 'room' and 'message' fields as the text input changes
    const [roomText, setRoomText] = useState("");
    const [message, setMessage] = useState("");
    const handleRoomChange = (event) => {
        setRoomText(event.target.value);
    };
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    // when 'Join Room' button is clicked, sends request to join room
    const joinRoom = () => {
        socket.emit("leave-room", room);
        setRoom(roomText);
        socket.emit("join-room", roomText);
    };

    // when 'Send Message' button is clicked, sends request to send a message to all sockets in the room
    const sendMessage = () => {
        let messageToSend = "";
        if (roomText === "") {
            messageToSend = `User ${socket.id} to Everyone: ${message}`;
        } else {
            messageToSend = `User ${socket.id} to Room ${roomText}: ${message}`;
        }
        socket.emit("send-message", messageToSend, roomText);
        addMessage(messageToSend);
        setMessage("");
    };

    return (
        <div>
            <div className="room-input">
                <input className="input-field" type="text" value={roomText} onChange={handleRoomChange} />
                <button className="input-submit" onClick={joinRoom}>
                    Join a Room
                </button>
            </div>
            <div className="message-input">
                <input className="input-field" type="text" value={message} onChange={handleMessageChange} />
                <button className="input-submit" onClick={sendMessage}>
                    Send a Message
                </button>
            </div>
        </div>
    );
};

export default InputFields;
