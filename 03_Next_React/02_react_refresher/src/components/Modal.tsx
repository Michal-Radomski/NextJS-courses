import { useNavigate } from "react-router-dom";

import classes from "./Modal.module.scss";

function Modal({ children }: { children: React.ReactNode }): JSX.Element {
  const navigate = useNavigate();

  function closeHandler(): void {
    navigate(".."); //* Up one level (like in console)
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
