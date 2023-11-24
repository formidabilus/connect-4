"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Modal() {
  const [inputRoomId, setInputRoomId] = useState("");
  const storageRoomId = sessionStorage && sessionStorage.getItem("roomId");

  useEffect(() => {
    socket.on("connect", () => {
      const roomId = storageRoomId ? storageRoomId : socket.id;
      sessionStorage.setItem("roomId", roomId);
      console.log(socket.id);
    });
  }, []);

  function handleClickFindButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    const room = inputRoomId;
    socket.emit("join-room", room);

    sessionStorage.setItem("joinRoomId", room);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputRoomId(event.target.value);
  }

  return (
    <div className="h-full grid justify-center content-center">
      <h2>Your ID: {storageRoomId}</h2>

      <Link className="place-self-center" href={"./game-start"}>
        <button className="border-2 rounded-md border-blue-600 p-3">
          Start game!
        </button>
      </Link>
      <input onChange={handleChange} type="text" className="text-black" />
      <button
        onClick={handleClickFindButton}
        className="border-2 rounded-md border-blue-600 p-3"
      >
        Find opponent
      </button>
    </div>
  );
}
