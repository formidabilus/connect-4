import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Modal from "@/components/Modal";
import { atom, PrimitiveAtom } from "jotai";
import { getRoom } from "@/util/helperFunctions";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");
// let roomIdAtom: any;

// // console.log(socketId);

// socket.on("connect", () => {
//   var socketId = socket.id;
//   roomIdAtom = atom(socketId!);
// });

// console.log(socketId);

export default async function Home() {
  // console.log("socletID: ", socket.id);
  // console.log("roomIdAtom: ", roomIdAtom);
  // const queryClient = new QueryClient();
  // await queryClient.prefetchQuery({
  //   queryKey: ["roomId"],
  //   queryFn: getRoom,
  // });

  return (
    <main>
      {/* <HydrationBoundary state={dehydrate}> */}
      <Modal />
      {/* </HydrationBoundary> */}
    </main>
  );
}
