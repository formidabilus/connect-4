import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

io.on("connection", (socket) => {
  socket.on("connect", () => {
    console.log("connected with socket id: ", socket.id);
    socket.broadcast.emit("socketID", socket.id);
  });
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("room from server join: ", room);
    console.log("rooms size: ", socket.rooms.size);
  });

  socket.on("send_nrOfPlayersJoined", (room, nrOfPlayersJoined) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      socket.to(room).emit("nrOfPlayersJoined", nrOfPlayersJoined);
      console.log("nrOfPlayersJoined: ", nrOfPlayersJoined);
    }
  });
  socket.on("send_player", (room, player) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      socket.to(room).emit("player", player);

      console.log("connected player: ", player);
      console.log("room from player socket: ", room);
    }
  });

  socket.on("send_currentColumns", (room, currentColumns) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      socket.to(room).emit("currentColumns", currentColumns);
    }
  });

  socket.on("send_colorOfTiles", (room, colorOfTiles) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      socket.to(room).emit("colorOfTiles", colorOfTiles);

      console.log("colorOfTiles: ", colorOfTiles);
      console.log("room from colorOfTiles socket: ", room);
    }
  });
  socket.on(
    "send_playerColor",
    (room, playerColor, redSelected, yellowSelected) => {
      if (!room) {
        console.log("No room selected!");
      } else {
        socket
          .to(room)
          .emit("playerColor", playerColor, redSelected, yellowSelected);

        console.log("playerColor: ", playerColor);
        console.log("room from playerColor socket: ", room);
      }
    }
  );
  socket.on("send_startMatch", (room, startMatch) => {
    if (!room) {
      console.log("No room selected!");
    } else {
      socket.to(room).emit("startMatch", startMatch);

      console.log("startMatch: ", startMatch);
      console.log("room from startMatch socket: ", room);
    }
  });
  socket.on("disconnecting", (room, nrOfPlayersJoined) => {
    console.log("Disconnected with socket rooms: ", socket.rooms); // the Set contains at least the socket ID
    console.log("room from disconnecting socket: ", room);
    socket.to(room).emit("nrOfPlayersJoined", nrOfPlayersJoined);
  });
});

// io.of("/").adapter.on("join-room", (room, id) => {
//   console.log(`socket ${id} has joined room ${room}`);
// });

const port = 3001;
server.listen(port, () => {
  console.log(`Server listening on port: ${port} `);
});
