"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import Counter from "./Counter";

const socket = io("http://localhost:3001");

export default function ModalChooseColor() {
  const router = useRouter();

  const red = 1;
  const yellow = 2;
  const [playerColor, setPlayerColor] = useState(0);
  const [redSelected, setRedSelected] = useState(false);
  const [yellowSelected, setYellowSelected] = useState(false);
  const [startMatch, setStartMatch] = useState(false);
  const [storageJoinRoomId, setStorageJoinRoomId] = useState("");

  useEffect(() => {
    const sessionRoomId = sessionStorage.getItem("joinRoomId");
    setStorageJoinRoomId(sessionRoomId as string);

    socket.emit("join-room", storageJoinRoomId!);
    socket.emit("send_startMatch", storageJoinRoomId, startMatch);
    socket.emit("send_playerColor", storageJoinRoomId, playerColor);

    storageJoinRoomId &&
      socket.on("playerColor", (playerColor) => {
        console.log(playerColor);
        if (playerColor === red) {
          setRedSelected(!redSelected);
        } else if (playerColor === yellow) {
          setYellowSelected(!yellowSelected);
        } else setPlayerColor(0);
        console.log("playerColor from client: ", playerColor);
        console.log("storageRoomId: ", storageJoinRoomId);
      }) &&
      socket.on("startMatch", (startMatch) => setStartMatch(startMatch));
  }, [storageJoinRoomId, redSelected, yellowSelected, playerColor, startMatch]);

  function handleClickRedButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setPlayerColor(red);
    setRedSelected(!redSelected);
  }

  function handleClickYellowButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setPlayerColor(yellow);
    setYellowSelected(!yellowSelected);
  }

  function handleClickStartButton() {
    setStartMatch(true);
    router.push("./game-start");
  }

  return (
    <>
      {!!startMatch && <Counter />}
      <div
        className={`h-screen w-screen top-0 bg-red-600 absolute ${
          startMatch ? "hidden" : ""
        }`}
      >
        <div
          className={`grid content-center h-screen w-screen sm:h-2/3 sm:w-2/3  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-90  shadow-black shadow-lg ${
            startMatch ? "hidden" : ""
          }`}
        >
          <h1 className="text-2xl text-center pb-10">Choose a color!</h1>
          <div className="flex justify-around">
            <button
              // disabled={redSelected}
              onClick={handleClickRedButton}
              className={`active:animate-ping border-2 border-black shadow-black shadow-inner bg-red-500 hover:bg-red-600 font-bold w-32 h-32 p-3 rounded-full ${
                redSelected
                  ? "!bg-gray-400 !hover:bg-gray-500 cursor-not-allowed !animate-none"
                  : ""
              } `}
            >
              RED
            </button>
            <button
              // disabled={yellowSelected}
              onClick={handleClickYellowButton}
              className={`active:animate-ping border-2 border-black shadow-black shadow-inner bg-yellow-500 hover:bg-yellow-600 font-bold w-32 h-32 p-3 rounded-full ${
                yellowSelected
                  ? "!bg-gray-400 disabled:!hover:bg-gray-500 cursor-not-allowed !animate-none"
                  : ""
              }`}
            >
              YELLOW
            </button>
          </div>

          <button
            disabled={!(redSelected && yellowSelected)}
            onClick={handleClickStartButton}
            className={`animate-bounce text-white mx-auto mt-10 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-10 py-5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              !(redSelected && yellowSelected)
                ? "!bg-gray-800 !text-red-700 cursor-not-allowed !animate-none"
                : ""
            }`}
          >
            Start match!
          </button>
        </div>
      </div>
    </>
  );
}
