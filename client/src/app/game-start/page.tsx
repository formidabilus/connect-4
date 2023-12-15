"use client";

import { Grid } from "@/components/Grid";
import { playerColorAtom, playerTurnAtom } from "@/components/ModalChooseColor";
import { useAtom } from "jotai";
import Link from "next/link";

export default function Page() {
  const [playerTurn, setPlayerTurn] = useAtom(playerTurnAtom);
  const [playerColor, setPlayerColor] = useAtom(playerColorAtom);
  return (
    <>
      <header>
        <h1 className="text-2xl text-center py-6 xs:pb-12 xs:pt-12">
          Connect 4
        </h1>
        <div className="text-xl flex justify-around">
          <h2 className="text-red-500">
            Red{" "}
            <span
              className={`w-5 h-5 border border-black  shadow-inner shadow-black rounded-full bg-red-500 inline-block align-middle ${
                playerColor === 1 && playerTurn
                  ? "animate-spin"
                  : "animate-none"
              }`}
            ></span>
          </h2>

          <h2 className="text-yellow-500">
            Yellow{" "}
            <span
              className={`w-5 h-5 border border-black  shadow-inner shadow-black rounded-full bg-yellow-500 inline-block align-middle ${
                playerColor === 2 && playerTurn
                  ? "animate-spin"
                  : "animate-none"
              }`}
            ></span>
          </h2>
        </div>
      </header>
      <Grid />
      <Link className="grid justify-center pt-4" href={"./"}>
        <button className="border-2 rounded-md border-blue-600 p-3">
          Find new lobby!
        </button>
      </Link>
      {/* <ModalChooseColor /> */}
    </>
  );
}
