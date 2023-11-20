import { Tiles } from "./Tiles";

export function Grid() {
  return (
    <div className="h-4/6 grid grid-rows-6  grid-cols-7 justify-center gap-2 md:mx-20 xl:mx-60 my-10 p-2 border-8 border-blue-900 bg-blue-700">
      <Tiles />
    </div>
  );
}
