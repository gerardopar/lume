import React, { useEffect } from "react";

import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "motion/react";

import { toastStore, ToastTypesEnum } from "../../stores/toasts";

export const Toast: React.FC = () => {
  const content = toastStore.useTracked("content");
  const isOpen = toastStore.useTracked("isOpen");
  const { type, duration } = toastStore.useTracked("options");

  const { close } = toastStore.actions;

  useEffect(() => {
    if (duration) {
      setTimeout(() => close(), duration);
    }
  }, [duration]);

  // Map modal type to className
  const toastTypeMap: Record<ToastTypesEnum, string> = {
    [ToastTypesEnum.Start]: "toast-start",
    [ToastTypesEnum.Center]: "toast-center",
    [ToastTypesEnum.End]: "toast-end",
    [ToastTypesEnum.Top]: "toast-top",
    [ToastTypesEnum.Middle]: "toast-middle",
    [ToastTypesEnum.Bottom]: "toast-bottom",
  };

  const toastType = toastTypeMap[type || ToastTypesEnum.End];

  const zIndex = `z-[1000]`; // takes higher z-index than backdrop / modals

  if (!content || !isOpen) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div className={`toast ${zIndex} ${toastType}`}>
          {content}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Toast;
