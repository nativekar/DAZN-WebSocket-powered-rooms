const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const { adminName, messageBody, messageFormatter } = require("./utils/message");
const { addUsers, removeUser, getAllUsersInRoom } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

//Run when a client connects
io.on("connection", (socket) => {
  var interval;
  socket.on("joinRoom", ({ username, room }) => {
    const user = addUsers({ id: socket.id, username, room });
    socket.join(user.room);
    // on connection, emit messages regularly at a set interval
    interval = setInterval(() => {
      socket.emit("message", messageFormatter(adminName, messageBody));
    }, 3500);
    //Broadcast when a client connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        messageFormatter(adminName, `${user.username} has joined the chat`)
      );
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getAllUsersInRoom(user.room),
    });
  });

  // runs on disconnect
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    clearInterval(interval);
    if (user) {
      io.to(user.room).emit(
        "message",
        messageFormatter(adminName, `${user.username} has left the chat`)
      );
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getAllUsersInRoom(user.room),
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
