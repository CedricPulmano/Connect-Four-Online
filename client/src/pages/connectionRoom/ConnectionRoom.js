import "./ConnectionRoom.css";
import InputFields from "../../components/inputFields/InputFields";
import socket from "../../scripts/socketConnection";

const ConnectionRoom = ({ messages, addMessage }) => {
    return (
        <div className="connection-room" id="Connection-Room">
            <h1 id="Connection">Connected with ID: {socket.id}</h1>
            <div id="Messages">
                <h2>Messages</h2>
                {messages.map((message, index) => {
                    return <h2 key={index}>{message}</h2>;
                })}
            </div>
            <InputFields socket={socket} addMessage={addMessage} />
        </div>
    );
};

export default ConnectionRoom;
