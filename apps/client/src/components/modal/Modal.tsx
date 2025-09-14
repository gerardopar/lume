import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "motion/react";

import { modalStore, ModalTypesEnum } from "../../stores/modals";

export const Modal: React.FC = () => {
  const content = modalStore.useTracked("content");
  const isOpen = modalStore.useTracked("isOpen");
  const { type, dismissible } = modalStore.useTracked("options");

  const { close } = modalStore.actions;

  if (!content || !isOpen) return null;

  // Map modal type to className
  const modalTypeMap: Record<ModalTypesEnum, string> = {
    [ModalTypesEnum.Top]: "modal-top",
    [ModalTypesEnum.Middle]: "modal-middle",
    [ModalTypesEnum.Bottom]: "modal-bottom",
    [ModalTypesEnum.Start]: "modal-start",
    [ModalTypesEnum.End]: "modal-end",
  };

  const modalType = modalTypeMap[type || ModalTypesEnum.Middle];

  // Lookup tables for motion values
  const offsetYMap: Record<ModalTypesEnum, number> = {
    [ModalTypesEnum.Top]: -50,
    [ModalTypesEnum.Middle]: 0,
    [ModalTypesEnum.Bottom]: 50,
    [ModalTypesEnum.Start]: 0,
    [ModalTypesEnum.End]: 0,
  };

  const scaleMap: Record<ModalTypesEnum, number> = {
    [ModalTypesEnum.Top]: 1,
    [ModalTypesEnum.Middle]: 0.95,
    [ModalTypesEnum.Bottom]: 1,
    [ModalTypesEnum.Start]: 1,
    [ModalTypesEnum.End]: 1,
  };

  const offsetY = offsetYMap[type || ModalTypesEnum.Middle] ?? 0;
  const scaleValue = scaleMap[type || ModalTypesEnum.Middle] ?? 1;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          className={`modal modal-open ${modalType}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            key="backdrop-overlay"
            className="modal-backdrop"
            onClick={dismissible ? close : () => {}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal box */}
          <motion.div
            key="modal-box"
            className="modal-box"
            initial={{ opacity: 0, y: offsetY, scale: scaleValue }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: offsetY, scale: scaleValue }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {content}
            <div className="modal-action">
              <button className="btn" onClick={close}>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
