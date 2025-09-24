import { SuccessToast } from "@components/toast/SuccessToast";
import { ErrorToast } from "@components/toast/ErrorToast";

import { useToast, DEFAULT_TOAST_DURATION } from "../stores/toasts";

export const useClipboard = () => {
  const { open } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        open(<SuccessToast message="Link copied to clipboard" />, {
          duration: DEFAULT_TOAST_DURATION,
        });
      })
      .catch(() => {
        open(<ErrorToast message="Failed to copy link" />, {
          duration: DEFAULT_TOAST_DURATION,
        });
      });
  };

  return {
    copyToClipboard,
  };
};
