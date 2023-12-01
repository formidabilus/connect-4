import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("room from server join: ", room);
  });
  socket.on("connect", () => {
    console.log("connected with socket id: ", socket.id);
    socket.broadcast.emit("socketID", socket.id);
  });
  socket.on("send_player", (room, player) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      socket.to(room).emit("player", player);
      console.log("connected player: ", player);
      console.log("room from player server: ", room);
    }
  });
  socket.on("send_colorOfTiles", (room, colorOfTiles) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      socket.to(room).emit("colorOfTiles", colorOfTiles);
      console.log("colorOfTiles: ", colorOfTiles);
      console.log("room from colorOfTiles server: ", room);
    }
  });
  socket.on("send_playerColor", (room, playerColor) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      socket.to(room).emit("playerColor", playerColor);

      console.log("playerColor: ", playerColor);
      console.log("room from playerColor server: ", room);
    }
  });
  socket.on("disconnecting", () => {
    console.log("Disconnected with socket rooms: ", socket.rooms); // the Set contains at least the socket ID
  });
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on port: ${port} `);
});
