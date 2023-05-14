// creates socket at port 8080, and allows cross-origin resource sharing with port 3000
const io = require("socket.io")(8080, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});

// listens for events
io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);

    // joins specific socket to given room if room is not full
    socket.on("join-room", (roomID, socketID) => {
        if (roomID === "") {
            return;
        }

        const room = io.sockets.adapter.rooms.get(roomID);

        // room is full - do not let client join
        if (room && room.size === 2) {
            console.log(roomID, "is full");
            io.to(socketID).emit("join-room-result", false, roomID);
            return;
        }

        // room is not full - let client join
        socket.join(roomID);
        io.to(socketID).emit("join-room-result", true, roomID);

        // if room is now full with two players, start game and assign who goes first
        if (room && room.size === 2) {
            const players = Array.from(room);
            const playerOneIndex = Math.floor(Math.random() * 2);
            const playerOne = players[playerOneIndex];
            const playerTwo = players[1 - playerOneIndex];
            io.to(playerOne).emit("start-game", true);
            io.to(playerTwo).emit("start-game", false);
            console.log("Player One:", playerOne);
            console.log("Player Two:", playerTwo);
        }
        console.log(`ROOM SIZE OF ${roomID}: ${room ? room.size : 1}`);
    });

    // joins specific socket to given room
    socket.on("leave-room", (room) => {
        if (room === "") {
            return;
        }
        socket.leave(room);
        console.log("USER IS LEAVING:", room);
        socket.to(room).emit("opponent-quit");
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

    // updates player when opponent makes a move
    socket.on("send-move", (room, x, y, color, win) => {
        if (win) {
            socket.to(room).emit("game-lost");
        } else {
            console.log(`${color} SENT A MOVE TO ${room}`);
            socket.to(room).emit("receive-move", x, y, color, win);
        }
    });

    // when user disconnects, emit to anyone else in the room that they disconnected
    socket.on("disconnecting", () => {
        const rooms = socket.rooms;
        console.log("USER DISCONENCTING FROM:", rooms);
        rooms.forEach((room) => {
            if (room && room !== socket.id) {
                console.log("USER IS LEAVING:", room);
                socket.to(room).emit("opponent-quit");
                socket.leave(room);
            }
        });

        console.log(`User ${socket.id} disconnected.`);
    });
});
