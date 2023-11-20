import { Grid } from "@/components/Grid";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <header>
        <h1 className="text-2xl text-center mb-12 mt-12">Connect 4</h1>
        <div className="text-xl flex justify-around">
          <h2 className="text-red-500">
            Player 1{" "}
            <span className="w-5 h-5 border border-black  shadow-inner shadow-black rounded-full bg-red-500 inline-block align-middle"></span>
          </h2>

          <h2 className="text-yellow-400">
            Player 2{" "}
            <span className="w-5 h-5 border border-black  shadow-inner shadow-black rounded-full bg-yellow-400 inline-block align-middle"></span>
          </h2>
        </div>
      </header>
      <Grid />
      <Link className="grid justify-center" href={"./"}>
        <button className="border-2 rounded-md border-blue-600 p-3">
          New game!
        </button>
      </Link>
    </>
  );
}
