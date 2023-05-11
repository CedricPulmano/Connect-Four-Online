import React, { useState } from "react";
import "./InputFields.css";
import socket from "../../scripts/socketConnection";

const InputFields = ({ addMessage, room, joined, setPlaying }) => {
    // sets up and updates the state of the 'room' and 'message' fields as the text input changes
    const [newRoom, setNewRoom] = useState("");
    const [message, setMessage] = useState("");
    const handleRoomChange = (event) => {
        setNewRoom(event.target.value);
    };
    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    // when 'Join Room' button is clicked, sends request to join room
    const joinRoom = () => {
        setPlaying(false);
        socket.emit("leave-room", room);
        socket.emit("join-room", newRoom, socket.id);
    };

    // when 'Send Message' button is clicked, sends request message request
    // - if Room is not provided, send to everyone
    // - if Room is provided, send message only if user is joined in that room
    const sendMessage = () => {
        let messageToSend = "";
        if (newRoom === "") {
            messageToSend = `User ${socket.id} to Everyone: ${message}`;
            socket.emit("send-message", messageToSend, newRoom);
            addMessage(messageToSend);
        } else {
            if (room === newRoom && joined) {
                messageToSend = `User ${socket.id} to Room ${newRoom}: ${message}`;
                socket.emit("send-message", messageToSend, newRoom);
                addMessage(messageToSend);
            }
        }
        setMessage("");
    };

    return (
        <div>
            <div className="room-input">
                <input className="input-field" type="text" value={newRoom} onChange={handleRoomChange} />
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
