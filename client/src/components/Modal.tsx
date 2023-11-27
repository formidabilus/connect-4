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

  function handleClickStartButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    socket.disconnect();
  }
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
      <div className="grid justify-center content-center space-y-2">
        <h2 className="text-center">
          Your ID: {storageRoomId}
          <br />
          <br />
        </h2>
        <Link className="place-self-center" href={"./game-start"}>
          <button
            onClick={handleClickStartButton}
            className="border-2 rounded-md border-blue-600 p-3 mb-4"
          >
            Play locally!
          </button>
        </Link>
      </div>
      <div className="bottom-10 absolute place-self-center  ">
        <input
          id="lobby"
          required
          placeholder="Lobby's name..."
          onChange={handleChange}
          type="text"
          className="block pr-20 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <Link className="place-self-center" href={"./game-start"}>
          <button
            disabled={!inputRoomId}
            onClick={handleClickFindButton}
            className={` text-white absolute end-2.5 bottom-2.5  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              !inputRoomId
                ? "!bg-gray-800 !text-red-700 cursor-not-allowed"
                : ""
            }`}
          >
            Enter lobby!
          </button>
        </Link>
      </div>
    </div>
  );
}
