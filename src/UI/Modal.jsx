import "./Modal.scss";
import { useState } from "react";

export const Modal = ({ title, children }) => {
  return (
    <div className="ModalOverlay">
      <div className="ModalPane">
        <header>
          <p>{title}</p>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export const useModal = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return [isOpen, open, close];
};
