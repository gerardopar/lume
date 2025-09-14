import { type ReactNode } from "react";
import { createStore } from "zustand-x";

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
};

export const modalStore = createStore<ModalState>(
  {
    isOpen: false,
    content: null,
  },
  {
    name: "modal",
    devtools: true,
    persist: false,
    mutative: true,
  }
).extendActions(({ set }) => ({
  open: (content: ReactNode) => {
    set("state", (draft) => {
      draft.isOpen = true;
      draft.content = content;
      return draft;
    });
  },
  close: () => {
    set("state", (draft) => {
      draft.isOpen = false;
      draft.content = null;
      return draft;
    });
  },
}));

export const useModal = () => {
  return {
    open: modalStore.actions.open,
    close: modalStore.actions.close,
  };
};
