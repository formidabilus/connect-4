"use client";

import { useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function ModalChooseColor() {
  const [playerColor, setPlayerColor] = useState("");
  const [redSelected, setRedSelected] = useState(false);
  const [yellowSelected, setYellowSelected] = useState(false);
  const [startMatch, setStartMatch] = useState(false);

  function handleClickRedButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setPlayerColor("red");
    setRedSelected(!redSelected);
    socket.emit("send_playerColor", playerColor);
  }

  function handleClickYellowButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setPlayerColor("yellow");
    setYellowSelected(!yellowSelected);
    socket.emit("send_playerColor", playerColor);
  }

  function handleClickStartButton() {
    setStartMatch(true);
  }

  return (
    <div
      className={`grid content-center h-screen w-screen sm:h-2/3 sm:w-2/3  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-90  shadow-black shadow-lg ${
        startMatch ? "hidden" : ""
      }`}
    >
      <h1 className="text-2xl text-center pb-10">Choose a color!</h1>
      <div className="flex justify-around">
        <button
          onClick={handleClickRedButton}
          className={`active:animate-ping border-2 border-black shadow-black shadow-inner bg-red-500 hover:bg-red-600 font-bold w-32 h-32 p-3 rounded-full ${
            redSelected ? "bg-gray-400 hover:bg-gray-500" : ""
          } `}
        >
          RED
        </button>
        <button
          onClick={handleClickYellowButton}
          className={`active:animate-ping border-2 border-black shadow-black shadow-inner bg-yellow-500 hover:bg-yellow-600 font-bold w-32 h-32 p-3 rounded-full ${
            yellowSelected ? "bg-gray-400 hover:bg-gray-500" : ""
          }`}
        >
          YELLOW
        </button>
      </div>
      <button
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
  );
}
