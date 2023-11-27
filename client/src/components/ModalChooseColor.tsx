"use client";

export default function ModalChooseColor() {
  return (
    <div className="h-screen w-screen sm:h-2/3 sm:w-2/3 grid absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-black bg-opacity-40  shadow-black shadow-lg">
      <h1 className="text-2xl text-center pb-10">Choose a color!</h1>
      <div className="flex justify-around">
        <button className="bg-red-500 hover:bg-red-600 font-bold w-32 h-32 p-3 rounded-full">
          RED
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-600 font-bold w-32 h-32 p-3 rounded-full">
          YELLOW
        </button>
      </div>
    </div>
  );
}
