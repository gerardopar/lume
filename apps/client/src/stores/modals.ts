import { type ReactNode } from "react";
import { createStore } from "zustand-x";

// to be used with <Modal />

export enum ModalTypesEnum {
  Top = "top",
  Middle = "middle", // Default
  Bottom = "bottom",
  Start = "start",
  End = "end",
}

export type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
  options: ModalOptions;
};

export type ModalOptions = {
  type?: ModalTypesEnum;
  dismissible?: boolean;
};

export const modalStore = createStore<ModalState>(
  {
    isOpen: false,
    content: null,
    options: {
      type: ModalTypesEnum.Middle,
      dismissible: true,
    },
  },
  {
    name: "modal",
    devtools: true,
    persist: false,
    mutative: true,
  }
).extendActions(({ set }) => ({
  open: (content: ReactNode, options?: { type?: ModalTypesEnum }) => {
    set("state", (draft) => {
      draft.isOpen = true;
      draft.content = content;
      if (options) {
        draft.options = { ...draft.options, ...options };
      }
      return draft;
    });
  },
  close: () => {
    set("state", (draft) => {
      draft.isOpen = false;
      draft.content = null;
      draft.options = { type: ModalTypesEnum.Middle, dismissible: true };
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
