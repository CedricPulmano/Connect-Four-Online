// creates socket at port 8080, and allows cross-origin resource sharing with port 3000
const io = require("socket.io")(8080, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

// listens for events
io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    // joins specific socket to given room
    socket.on("join-room", (room) => {
        socket.join(room);
        console.log("Joined room:", room);
    });

    // joins specific socket to given room
    socket.on("leave-room", (room) => {
        socket.leave(room);
        console.log("Left room:", room);
    });

    // sends message to all sockets that are in the given room (if room has been provided)
    socket.on("send-message", (message, room) => {
        if (room === "") {
            socket.broadcast.emit("receive-message", message);
        } else {
            socket.to(room).emit("receive-message", message);
        }
    });
});
