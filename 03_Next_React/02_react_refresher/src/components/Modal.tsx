import classes from "./Modal.module.scss";

function Modal({ children, onClose }: { children: React.ReactNode; onClose?: () => void }): JSX.Element {
  return (
    <>
      <div className={classes.backdrop} onClick={onClose} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
