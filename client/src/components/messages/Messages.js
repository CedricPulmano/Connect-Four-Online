import React from "react";
import "./Messages.css";

const Messages = ({ messages }) => {
    return (
        <div className="messages-container">
            <h2 className="messages-header">Messages</h2>
            <div className="messages-list">
                {messages.map((message, index) => {
                    return (
                        <div className="message" key={index}>
                            {message}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Messages;
