import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("player", (player: number) => {
    console.log(player);
    socket.broadcast.emit("player", player);
  });
});
