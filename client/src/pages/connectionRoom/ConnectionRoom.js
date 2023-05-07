import "./ConnectionRoom.css";
import Messages from "../../components/messages/Messages";
import InputFields from "../../components/inputFields/InputFields";
import socket from "../../scripts/socketConnection";

const ConnectionRoom = ({ messages, addMessage }) => {
    return (
        <div className="connection-room" id="Connection-Room">
            <h1 id="Connection">Connected with ID: {socket.id}</h1>
            <InputFields socket={socket} addMessage={addMessage} />
            <Messages messages={messages} />
        </div>
    );
};

export default ConnectionRoom;
