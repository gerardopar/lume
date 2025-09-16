import { type ReactNode } from "react";
import { createStore } from "zustand-x";

// to be used with <Toast />

export const DEFAULT_TOAST_DURATION = 5000;

export enum ToastTypesEnum {
  Start = "start",
  Center = "center",
  End = "end", // Default
  Top = "top",
  Middle = "middle",
  Bottom = "bottom",
}

export type ToastState = {
  isOpen: boolean;
  content: ReactNode | null;
  options: ToastOptions;
};

export type ToastOptions = {
  type?: ToastTypesEnum;
  dismissible?: boolean;
  duration?: number;
};

export const toastStore = createStore<ToastState>(
  {
    isOpen: false,
    content: null,
    options: {
      type: ToastTypesEnum.End,
      dismissible: true,
      duration: DEFAULT_TOAST_DURATION,
    },
  },
  {
    name: "toast",
    devtools: true,
    persist: false,
    mutative: true,
  }
).extendActions(({ set }) => ({
  open: (content: ReactNode, options?: ToastOptions) => {
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
      draft.options = {
        type: ToastTypesEnum.End,
        dismissible: true,
        duration: DEFAULT_TOAST_DURATION,
      };
      return draft;
    });
  },
}));

export const useToast = () => {
  return {
    open: toastStore.actions.open,
    close: toastStore.actions.close,
  };
};
