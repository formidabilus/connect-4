import { Grid } from "@/components/Grid";

export default function Home() {
  return (
    <>
      <header>
        <h1 className="text-2xl text-center mb-12 mt-12">Connect 4</h1>
        <div className="text-xl flex justify-around">
          <h2 className="text-red-500">
            Player 1{" "}
            <span className="w-5 h-5 border border-black rounded-full bg-red-500 inline-block align-middle"></span>
          </h2>

          <h2 className="text-yellow-400">
            Player 2{" "}
            <span className="w-5 h-5 border border-black rounded-full bg-yellow-400 inline-block align-middle"></span>
          </h2>
        </div>
      </header>
      <Grid />
    </>
  );
}
