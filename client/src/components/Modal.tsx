"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Modal() {
  // const [roomId, setRoomId] = useState("");

  const storageRoomId = sessionStorage.getItem("roomId");

  socket.on("connect", () => {
    const roomId = storageRoomId ? storageRoomId : socket.id;
    sessionStorage.setItem("roomId", roomId);
    console.log(socket.id);
  });
  // useEffect(() => {
  // }, [roomId]);

  return (
    <div className="h-full grid justify-center content-center">
      <h2>Your ID: {storageRoomId}</h2>

      <Link className="place-self-center" href={"./game-start"}>
        <button className="border-2 rounded-md border-blue-600 p-3">
          Start game!
        </button>
      </Link>
    </div>
  );
}
