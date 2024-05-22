import Modal from "./Modal";

export default function ModalWinner({ winner }: { winner: unknown }) {
  return <Modal showModal={winner as boolean}>Winner</Modal>;
}
