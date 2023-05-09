import "./ConnectionRoom.css";
import Messages from "../../components/messages/Messages";
import InputFields from "../../components/inputFields/InputFields";
import socket from "../../scripts/socketConnection";

const ConnectionRoom = ({ messages, room, addMessage }) => {
    return (
        <div className="connection-room" id="Connection-Room">
            <h1 id="Connection">Connected with ID: {socket.id}</h1>
            <h1>{room}</h1>
            <InputFields addMessage={addMessage} room={room} />
            <Messages messages={messages} />
        </div>
    );
};

export default ConnectionRoom;
