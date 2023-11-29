"use client";

import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function ModalHome() {
  const [inputRoomId, setInputRoomId] = useState("");
  const [storageRoomId, setStorageRoomId] = useState("");

  useEffect(() => {
    setStorageRoomId(sessionStorage?.getItem("roomId")!);
    socket.on("connect", () => {
      const roomId = storageRoomId ? storageRoomId : socket.id;
      sessionStorage.setItem("roomId", roomId);
      console.log(socket.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="h-screen w-screen sm:h-2/3 sm:w-2/3 grid absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-black bg-opacity-40  shadow-black shadow-lg">
      <h1 className="text-2xl text-center pb-10">Connect 4</h1>
      <div className="grid m-2">
        <Link className="place-self-center" href={"./game-start"}>
          <button className=" text-white   hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Play locally!
          </button>
        </Link>
      </div>
      <div className="relative place-self-center  ">
        <input
          id="lobby"
          required
          placeholder="Lobby's name..."
          onChange={handleChange}
          type="text"
          className="block pr-20 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
        />
        <Link className="place-self-center" href={"./game-start"}>
          <button
            disabled={!inputRoomId}
            onClick={handleClickFindButton}
            className={`text-white absolute end-2.5 bottom-2.5  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
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