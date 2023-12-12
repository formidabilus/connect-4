"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Counter from "./Counter";
import { atom, useAtom } from "jotai";

const socket = io("http://localhost:3001");
export const playerTurnAtom = atom(false);
export const playerColorAtom = atom(0);

export default function ModalChooseColor() {
  const red = 1;
  const yellow = 2;
  const [redSelected, setRedSelected] = useState(false);
  const [yellowSelected, setYellowSelected] = useState(false);
  const [startMatch, setStartMatch] = useState(false);
  const [storageJoinRoomId, setStorageJoinRoomId] = useState("");
  const [nrOfPlayersJoined, setNrOfPlayersJoined] = useState(1);
  const [_, setPlayerTurn] = useAtom(playerTurnAtom);
  const [playerColor, setPlayerColor] = useAtom(playerColorAtom);

  useEffect(() => {
    socket.emit("send_nrOfPlayersJoined", storageJoinRoomId, nrOfPlayersJoined);
    socket.on("nrOfPlayersJoined", (nrOfPlayersJoined) => {
      const newPlayerJoined = nrOfPlayersJoined + 1;
      setNrOfPlayersJoined(newPlayerJoined);
      console.log("nrOfPlayersJoined: ", newPlayerJoined);
    });

    socket.on("disconnecting", (nrOfPlayersJoined) => {
      const onePlayerDisconnected = nrOfPlayersJoined - 1;
      setNrOfPlayersJoined(onePlayerDisconnected);
      console.log("nrOfPlayersJoined: ", nrOfPlayersJoined);
    });
  }, []);

  useEffect(() => {
    const sessionRoomId = sessionStorage.getItem("joinRoomId");
    setStorageJoinRoomId(sessionRoomId as string);
    socket.emit("join-room", storageJoinRoomId!);
    socket.emit("send_nrOfPlayersJoined", storageJoinRoomId, nrOfPlayersJoined);
    // socket.on("nrOfPlayersJoined", (newPlayerJoined) => {
    //   setNrOfPlayersJoined(newPlayerJoined);
    //   console.log("nrOfPlayersJoined: ", nrOfPlayersJoined);
    // });

    // socket.on("disconnecting", (onePlayerDisconnected) => {
    //   setNrOfPlayersJoined(onePlayerDisconnected);
    //   console.log("nrOfPlayersJoined: ", nrOfPlayersJoined);
    // });

    // socket.emit(
    //   "disconnecting",
    //   (storageJoinRoomId: string, nrOfPlayersJoined: number) => {
    //     console.log(storageJoinRoomId);
    //     setNrOfPlayersJoined(nrOfPlayersJoined - 1);
    //   }
    // );

    socket.on("playerColor", (playerColor, redSelected, yellowSelected) => {
      if (playerColor === red) {
        setRedSelected(redSelected);
        // setPlayerColor(red);
      } else if (playerColor === yellow) {
        setYellowSelected(yellowSelected);
        // setPlayerColor(yellow);
      } else return;

      console.log("playerColor from client: ", playerColor);
      console.log("storageRoomId: ", storageJoinRoomId);
    });

    socket.on("startMatch", (startMatch) => setStartMatch(startMatch));

    socket.emit(
      "send_playerColor",
      storageJoinRoomId,
      playerColor,
      redSelected,
      yellowSelected
    );
    socket.emit("send_startMatch", storageJoinRoomId, startMatch);
  }, [storageJoinRoomId, playerColor, redSelected, yellowSelected, startMatch]);

  function handleClickRedButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setRedSelected(!redSelected);
    setPlayerColor(red);
    setPlayerTurn(true);
  }

  function handleClickYellowButton(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    setYellowSelected(!yellowSelected);
    setPlayerColor(yellow);
  }

  function handleClickStartButton() {
    setStartMatch(true);
  }

  return (
    <>
      {!!startMatch && <Counter />}
      <div className={`h-full w-full absolute ${startMatch ? "hidden" : ""}`}>
        <div
          className={`grid content-center h-screen w-screen sm:h-2/3 sm:w-2/3  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-black bg-opacity-90  shadow-black shadow-lg ${
            startMatch ? "hidden" : ""
          }`}
        >
          <h1 className="text-2xl text-center pb-10">{`${
            nrOfPlayersJoined < 2 ? "Waiting for opponet..." : "Choose a color!"
          }`}</h1>
          <div className="flex justify-around">
            <button
              disabled={nrOfPlayersJoined < 2 ? true : false}
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
              disabled={nrOfPlayersJoined < 2 ? true : false}
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
