import "./ConnectionRoom.css";
import Messages from "../../components/messages/Messages";
import InputFields from "../../components/inputFields/InputFields";
import socket from "../../scripts/socketConnection";

const ConnectionRoom = ({ messages, room, addMessage, setRoom }) => {
    return (
        <div className="connection-room" id="Connection-Room">
            <h1 id="Connection">Connected with ID: {socket.id}</h1>
            {room === "" ? <h1>Join a Room</h1> : <h1>Joined Room: {room}</h1>}
            <InputFields addMessage={addMessage} setRoom={setRoom} room={room} />
            <Messages messages={messages} />
        </div>
    );
};

export default ConnectionRoom;
