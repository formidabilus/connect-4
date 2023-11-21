"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function Home() {
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setRoomId(socket.id);
    });
  }, [roomId]);

  return (
    <main>
      <div className="h-full grid justify-center content-center">
        <h2>Your ID: {`${roomId}`}</h2>
        <Link className="place-self-center" href={"./game-start"}>
          <button className="border-2 rounded-md border-blue-600 p-3">
            Start game!
          </button>
        </Link>
      </div>
    </main>
  );
}
