import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="h-full grid justify-center content-center">
        <Link href={"./game-start"}>
          <button className="border-2 rounded-md border-blue-600 p-3">
            Start game!
          </button>
        </Link>
      </div>
    </main>
  );
}
