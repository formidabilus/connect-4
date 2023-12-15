"use client";

import { useEffect, useState } from "react";
import Tile from "./Tile";
import { io } from "socket.io-client";
import { useAtom } from "jotai";
import { playerColorAtom, playerTurnAtom } from "./ModalChooseColor";
import { playLocallyAtom } from "./ModalHome";

const socket = io("http://localhost:3001");

export function Tiles() {
  const nrOfRows = 6;
  const nrOfColumns = 7;
  const red = 1;
  const yellow = 2;
  const nrOfTiles = Array(nrOfRows)
    .fill(0)
    .map((row) => Array(nrOfColumns).fill(0));

  const [currentCollumns, setCurrentCollumns] = useState(
    Array(nrOfColumns).fill(nrOfRows - 1)
  );
  const [colorOfTiles, setColorOfTiles] = useState([...nrOfTiles]);
  const [roomId, setRoomId] = useState("");
  const [playerTurn, setPlayerTurn] = useAtom(playerTurnAtom);
  const [player, setPlayer] = useAtom(playerColorAtom);
  const [playLocally] = useAtom(playLocallyAtom);
  const [notYourTurn, setNotYourTurn] = useState(false);

  useEffect(() => {
    const sessionRoomId = sessionStorage.getItem("joinRoomId");
    setRoomId(sessionRoomId!);

    socket.emit("join-room", roomId);
    console.log("playLocally from UE: ", playLocally);
    playLocally && !player ? setPlayer(red) : player;
    // socket.on("player", (player) => {
    //   player === red ? setPlayer(yellow) : setPlayer(red);
    // });
    console.log("player from tiles: ", player);

    socket.on("colorOfTiles", (colorOfTiles) => {
      setColorOfTiles([...colorOfTiles]);
    });
    socket.on("playerTurn", (playerTurn) => setPlayerTurn(playerTurn));

    // socket.emit("send_playerTurn", roomId, playerTurn);
    socket.emit("send_playerColor", roomId, player);
    console.log("playerTurn: ", playerTurn);

    // handleClick;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, colorOfTiles, roomId, notYourTurn]);

  const checkVerticalColors = () => {
    colorOfTiles
      .filter((row, rowIndex) => rowIndex < nrOfRows - 3)
      .forEach((rowToTest, rowToTestIndex) =>
        rowToTest.forEach((column, columnIndex) => {
          if (colorOfTiles[rowToTestIndex][columnIndex] !== 0) {
            if (
              colorOfTiles[rowToTestIndex][columnIndex] ==
                colorOfTiles[rowToTestIndex + 1][columnIndex] &&
              colorOfTiles[rowToTestIndex + 1][columnIndex] ==
                colorOfTiles[rowToTestIndex + 2][columnIndex] &&
              colorOfTiles[rowToTestIndex + 2][columnIndex] ==
                colorOfTiles[rowToTestIndex + 3][columnIndex]
            ) {
              const winner = colorOfTiles[rowToTestIndex][columnIndex];
              displayWinner(winner);
              return;
            } else return;
          }
        })
      );
  };

  const checkHorizontalColors = () => {
    colorOfTiles.forEach((row, rowIndex) =>
      row
        .filter((column, columnIndex) => columnIndex < nrOfColumns - 3)
        .forEach((columnToTest, columnToTestIndex) => {
          if (colorOfTiles[rowIndex][columnToTestIndex] !== 0) {
            if (
              colorOfTiles[rowIndex][columnToTestIndex] ==
                colorOfTiles[rowIndex][columnToTestIndex + 1] &&
              colorOfTiles[rowIndex][columnToTestIndex + 1] ==
                colorOfTiles[rowIndex][columnToTestIndex + 2] &&
              colorOfTiles[rowIndex][columnToTestIndex + 2] ==
                colorOfTiles[rowIndex][columnToTestIndex + 3]
            ) {
              const winner = colorOfTiles[rowIndex][columnToTestIndex];
              displayWinner(winner);
              return;
            } else return;
          }
        })
    );
  };

  const checkAntiDiagonallyColors = () => {
    colorOfTiles
      .filter((row, rowIndex) => rowIndex < nrOfRows - 3)
      .filter((rowToTest, rowToTestIndex) =>
        rowToTest
          .filter((column, columnIndex) => columnIndex < nrOfColumns - 3)
          .forEach((columnToTest, columnToTestIndex) => {
            if (colorOfTiles[rowToTestIndex][columnToTestIndex] !== 0) {
              if (
                colorOfTiles[rowToTestIndex][columnToTestIndex] ==
                  colorOfTiles[rowToTestIndex + 1][columnToTestIndex + 1] &&
                colorOfTiles[rowToTestIndex + 1][columnToTestIndex + 1] ==
                  colorOfTiles[rowToTestIndex + 2][columnToTestIndex + 2] &&
                colorOfTiles[rowToTestIndex + 2][columnToTestIndex + 2] ==
                  colorOfTiles[rowToTestIndex + 3][columnToTestIndex + 3]
              ) {
                const winner = colorOfTiles[rowToTestIndex][columnToTestIndex];
                displayWinner(winner);
                return;
              } else return;
            }
          })
      );
  };

  const checkDiagonallyColors = () => {
    for (let row = 3; row < nrOfRows; row++) {
      for (let column = 0; column < nrOfColumns - 3; column++) {
        if (colorOfTiles[row][column] !== 0) {
          if (
            colorOfTiles[row][column] == colorOfTiles[row - 1][column + 1] &&
            colorOfTiles[row - 1][column + 1] ==
              colorOfTiles[row - 2][column + 2] &&
            colorOfTiles[row - 2][column + 2] ==
              colorOfTiles[row - 3][column + 3]
          ) {
            const winner = colorOfTiles[row][column];
            displayWinner(winner);
            return;
          }
        }
      }
    }
  };
  const checkNoMatchedColors = () => {
    console.log("currentCollumns: ", currentCollumns);
    const draw = 0;
    const allTilesWhereUsed =
      currentCollumns.reduce((sum, rowLevel) => sum + rowLevel, 0) == -7;
    allTilesWhereUsed ? displayWinner(draw) : null;
  };

  function displayWinner(winner: number) {
    if (winner === red) {
      alert("Red wins!");
    } else if (winner === yellow) {
      alert("Yellow wins!");
    } else alert("It's a draw!");
  }

  const checkWinner = () => {
    checkHorizontalColors();
    checkVerticalColors();
    checkAntiDiagonallyColors();
    checkDiagonallyColors();
    checkNoMatchedColors();
  };

  function handleClick(columnIndex: number) {
    let rowIndexLevel = currentCollumns[columnIndex];
    if (!!colorOfTiles[rowIndexLevel][columnIndex]) {
      --rowIndexLevel;
    }
    if (rowIndexLevel < 0) return;
    console.log("playerTurn from handleClick: ", playerTurn);
    console.log("playLocally from handleClick: ", playLocally);

    playerTurn ? setNotYourTurn(false) : setNotYourTurn(true);
    setTimeout(() => {
      setNotYourTurn(false);
    }, 500);
    console.log("notYourTurn: ", notYourTurn);

    if (playerTurn) {
      playLocally ? playerTurn : setPlayerTurn(!playerTurn);
      if (player === red) {
        colorOfTiles[rowIndexLevel][columnIndex] = red;
        setColorOfTiles([...colorOfTiles]);
        !!playLocally && setPlayer(yellow);
      } else if (player === yellow) {
        colorOfTiles[rowIndexLevel][columnIndex] = yellow;
        setColorOfTiles([...colorOfTiles]);
        !!playLocally && setPlayer(red);
      } else return;
    } else return;

    currentCollumns[columnIndex] = --rowIndexLevel;
    setCurrentCollumns([...currentCollumns]);

    socket.emit("send_playerTurn", roomId, playerTurn);
    socket.emit("send_player", roomId, player);
    socket.emit("send_colorOfTiles", roomId, colorOfTiles);

    checkWinner();

    console.log("roomId from Tiles: ", roomId);
  }

  return (
    <>
      {notYourTurn && (
        <div className="absolute grid place-items-center h-full w-full text-center">
          <span
            className={`${
              player === red ? "text-yellow-500" : "text-red-500"
            } text-3xl font-extrabold shadow-black animate-[ping_1s_ease-in-out_1]`}
          >
            {`${player === red ? "Yellow's turn!" : "Red's turn!"}`}
          </span>
        </div>
      )}
      {nrOfTiles.map((row, rowIndex) =>
        row.map((column, columnIndex) => (
          <Tile
            onClick={() => handleClick(columnIndex)}
            colorOfTiles={colorOfTiles}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            key={`${rowIndex} - ${columnIndex}`}
          />
        ))
      )}
    </>
  );
}
