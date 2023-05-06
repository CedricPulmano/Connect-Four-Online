import "./ConnectionRoom.css";
import InputFields from "../../components/inputFields/InputFields";

const ConnectionRoom = ({ socket, socketID, messages, addMessage }) => {
    return (
        <div className="connection-room" id="Connection-Room">
            <h1 id="Connection">Connected with ID: {socketID}</h1>
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
