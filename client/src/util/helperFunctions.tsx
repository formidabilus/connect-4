import { atom } from "jotai";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

export function getRoom() {
  let roomIdAtom;
  socket.on("connect", () => {
    var socketId = socket?.id;
    roomIdAtom = atom(socketId);
  });
  return roomIdAtom;
}
