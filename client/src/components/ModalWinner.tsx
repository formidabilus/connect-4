import Modal from "./Modal";

export default function ModalWinner({ winner }: { winner: number }) {
  const result =
    winner == 1 ? "Red" : winner == 2 ? "Yellow" : winner == 3 ? "Draw" : null;
  console.log("winner from winnerModal: ", winner);
  return (
    <Modal showModal={!winner} className="bg-opacity-90">
      <h1
        className={`${
          winner == 2
            ? "text-yellow-500"
            : winner == 1
            ? "text-red-500"
            : "text-gray-500"
        } text-7xl text-center`}
      >
        {" "}
        {winner < 3 ? `${result} Won!` : `It's a Draw!`}{" "}
      </h1>
    </Modal>
  );
}
