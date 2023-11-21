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
  socket.on("player", (player, room) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      console.log("connected player: ", player);
      socket.to(room).emit("player", player);
    }
  });
  socket.on("colorTiles", (colorTiles, room) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      console.log("colorTiles: ", colorTiles);
      socket.broadcast.emit("colorTiles", colorTiles);
    }
  });
  // socket.on('join-room', room) => {
  //   socket.join(room)
  // }
});

const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on port: ${port} `);
});
