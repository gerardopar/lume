import React from "react";
import ReactDOM from "react-dom";

import { modalStore } from "../../stores/modals";

export const Modal: React.FC = () => {
  const content = modalStore.useTracked("content");
  const isOpen = modalStore.useTracked("isOpen");
  const { close } = modalStore.actions;

  if (!content || !isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal modal-open">
      <div className="modal-box">
        {content}
        <div className="modal-action">
          <button className="btn" onClick={close}>
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={close} />
    </div>,
    document.body
  );
};

export default Modal;
