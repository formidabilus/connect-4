"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Modal() {
  const [inputRoomId, setInputRoomId] = useState("");
  const [storageRoomId, setStorageRoomId] = useState("");

  useEffect(() => {
    setStorageRoomId(sessionStorage?.getItem("roomId")!);
    socket.on("connect", () => {
      const roomId = storageRoomId ? storageRoomId : socket.id;
      sessionStorage.setItem("roomId", roomId);
      console.log(socket.id);
    });
  }, []);

  function handleClickFindButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    const room = inputRoomId;
    socket.emit("join-room", room);

    sessionStorage.setItem("joinRoomId", room);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setInputRoomId(event.target.value);
  }

  return (
    <div className="h-screen grid justify-center content-center">
      <div className="h-auto grid justify-center content-center">
        <h2>
          Your ID: {storageRoomId}
          <br />
          Play locally!
        </h2>

        <Link className="place-self-center" href={"./game-start"}>
          <button className="border-2 rounded-md border-blue-600 p-3">
            Start match!
          </button>
        </Link>
      </div>
      <input
        id="lobby"
        required
        placeholder="Enter lobby's name..."
        onChange={handleChange}
        type="text"
        className="text-black"
      />
      <Link className="place-self-center" href={"./game-start"}>
        <button
          onClick={handleClickFindButton}
          className="border-2 rounded-md border-blue-600 p-3"
        >
          Find lobby!
        </button>
      </Link>
    </div>
  );
}
