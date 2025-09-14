import React from "react";
import ReactDOM from "react-dom";

import { modalStore, ModalTypesEnum } from "../../stores/modals";

export const Modal: React.FC = () => {
  const content = modalStore.useTracked("content");
  const isOpen = modalStore.useTracked("isOpen");
  const { type } = modalStore.useTracked("options");

  const { close } = modalStore.actions;

  if (!content || !isOpen) return null;

  let modalType = "modal-middle"; // Default

  if (type === ModalTypesEnum.Top) {
    modalType = "modal-top";
  } else if (type === ModalTypesEnum.Bottom) {
    modalType = "modal-bottom";
  } else if (type === ModalTypesEnum.Middle) {
    modalType = "modal-middle";
  } else if (type === ModalTypesEnum.Start) {
    modalType = "modal-start";
  } else if (type === ModalTypesEnum.End) {
    modalType = "modal-end";
  }

  return ReactDOM.createPortal(
    <div className={`modal modal-open ${modalType}`}>
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
