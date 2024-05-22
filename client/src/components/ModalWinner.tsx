import Modal from "./Modal";

export default function ModalWinner({ winner }: { winner: boolean }) {
  return <Modal showModal={!winner}>Winner</Modal>;
}
