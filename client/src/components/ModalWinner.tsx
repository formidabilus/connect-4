import Modal from "./Modal";

export default function ModalWinner({ winner }: { winner: number }) {
  const result =
    winner == 1 ? "red" : winner == 2 ? "yellow" : winner == 3 ? "draw" : null;
  console.log("winner from winnerModal: ", winner);
  return (
    <Modal showModal={!winner}>
      <h1>Winner: {result}</h1>
    </Modal>
  );
}
