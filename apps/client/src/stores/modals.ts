import { type ReactNode } from "react";
import { createStore } from "zustand-x";
import { nanoid } from "nanoid";

// Types
export enum ModalTypesEnum {
  Top = "top",
  Middle = "middle", // Default
  Bottom = "bottom",
  Start = "start",
  End = "end",
}

export type ModalOptions = {
  type?: ModalTypesEnum;
  dismissible?: boolean;
  modalBoxClassName?: string; // content container
};

export type ModalEntry = {
  id: string;
  content: ReactNode;
  options: ModalOptions;
};

export type ModalState = {
  modals: ModalEntry[];
};

// Store
export const modalStore = createStore<ModalState>(
  {
    modals: [],
  },
  {
    name: "modal",
    devtools: true,
    persist: false,
    mutative: true,
  }
).extendActions(({ set }) => ({
  open: (content: ReactNode, options?: ModalOptions) => {
    set("state", (draft) => {
      draft?.modals?.push({
        id: nanoid(),
        content,
        options: {
          type: ModalTypesEnum.Middle,
          dismissible: true,
          modalBoxClassName: "",
          ...options,
        },
      });
      return draft;
    });
  },
  close: (id?: string) => {
    set("state", (draft) => {
      if (id) {
        draft.modals = draft?.modals?.filter((m) => m.id !== id);
      } else {
        draft?.modals?.pop(); // close last one by default
      }
      return draft;
    });
  },
  closeAll: () => {
    set("state", (draft) => {
      draft.modals = [];
      return draft;
    });
  },
}));

// Hook
export const useModal = () => {
  return {
    modals: modalStore.useTracked("modals"),
    open: modalStore.actions.open,
    close: modalStore.actions.close,
    closeAll: modalStore.actions.closeAll,
  };
};
