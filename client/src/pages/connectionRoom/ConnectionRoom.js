import "./ConnectionRoom.css";
import Messages from "../../components/messages/Messages";
import InputFields from "../../components/inputFields/InputFields";
import socket from "../../scripts/socketConnection";

const ConnectionRoom = ({ messages, addMessage, room, joined, setPlaying }) => {
    return (
        <div className="connection-room" id="Connection-Room">
            <h1 id="Connection">Connected with ID: {socket.id}</h1>
            <h1>
                {room === ""
                    ? "Join a Room"
                    : joined === true
                    ? `Successfully joined: ${room}`
                    : `${room} is already full`}
            </h1>
            <InputFields addMessage={addMessage} room={room} joined={joined} setPlaying={setPlaying} />
            <Messages messages={messages} />
        </div>
    );
};

export default ConnectionRoom;
