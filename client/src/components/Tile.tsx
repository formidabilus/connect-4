import React from "react";

type Props = {
  colorOfTiles: number[][];
  rowIndex: number;
  columnIndex: number;
  onClick?: React.MouseEventHandler;
};

export default function Tile({
  colorOfTiles,
  rowIndex,
  columnIndex,
  onClick,
}: Props) {
  const red = 1;
  const yellow = 2;
  return (
    <div
      onClick={onClick}
      className={`${
        colorOfTiles[rowIndex][columnIndex] === red
          ? "!bg-red-500"
          : colorOfTiles[rowIndex][columnIndex] === yellow
          ? "!bg-yellow-400"
          : ""
      } rounded-full border-2 border-black  shadow-inner shadow-black cursor-pointer text-center text-sm grid items-center h-10 w-10 sm:w-20 sm:h-20 lg:h-20 lg:w-20 xl:h-24 xl:w-24 justify-self-center text-cyan-900 bg-white `}
    ></div>
  );
}
