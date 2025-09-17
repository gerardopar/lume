import React from "react";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "motion/react";

import { modalStore, ModalTypesEnum } from "../../stores/modals";

export const Modal: React.FC = () => {
  const modals = modalStore.useTracked("modals");
  const { close } = modalStore.actions;

  // Lookup tables
  const modalTypeMap: Record<ModalTypesEnum, string> = {
    [ModalTypesEnum.Top]: "modal-top",
    [ModalTypesEnum.Middle]: "modal-middle",
    [ModalTypesEnum.Bottom]: "modal-bottom",
    [ModalTypesEnum.Start]: "modal-start",
    [ModalTypesEnum.End]: "modal-end",
  };

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

  return ReactDOM.createPortal(
    <AnimatePresence>
      {modals.map((m) => {
        const type = m.options.type ?? ModalTypesEnum.Middle;
        const modalType = modalTypeMap[type];
        const offsetY = offsetYMap[type] ?? 0;
        const scaleValue = scaleMap[type] ?? 1;

        return (
          <motion.div
            key={m.id}
            className={`modal modal-open ${modalType}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ zIndex: 50 + modals.indexOf(m) }} // newer modals on top
          >
            {/* Backdrop */}
            <motion.div
              className="modal-backdrop"
              onClick={m.options.dismissible ? () => close(m.id) : undefined}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Modal box */}
            <motion.div
              className={`modal-box ${m.options.modalBoxClassName}`}
              initial={{ opacity: 0, y: offsetY, scale: scaleValue }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: offsetY, scale: scaleValue }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {m.content}
            </motion.div>
          </motion.div>
        );
      })}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
