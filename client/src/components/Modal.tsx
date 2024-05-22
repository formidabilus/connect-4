type Props = {
  className?: string;
  showModal: boolean;
  children: any;
};

const Modal = ({ className, showModal, children }: Props) => {
  return (
    <div
      className={`${
        showModal ? "hidden" : ""
      } h-screen w-screen sm:h-2/3 sm:w-2/3 grid absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 content-center bg-black bg-opacity-40  shadow-black shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Modal;
