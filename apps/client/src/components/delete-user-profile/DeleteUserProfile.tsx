import React from "react";
import { trpc } from "../../utils/trpc";

import { useModal } from "../../stores/modals";
import CloseButton from "../shared/CloseButton";
import ErrorToast from "../toast/ErrorToast";
import SuccessToast from "../toast/SuccessToast";

import { useToast, DEFAULT_TOAST_DURATION } from "../../stores/toasts";

const DeleteUserProfile: React.FC = () => {
  const { close, closeAll } = useModal();
  const { open } = useToast();

  const { mutateAsync: deleteUser, isPending } =
    trpc.user.deleteUser.useMutation();

  const handleDelete = async () => {
    try {
      await deleteUser(undefined, {
        onSuccess: () => {
          closeAll();
          open(<SuccessToast message="User deleted successfully" />, {
            duration: DEFAULT_TOAST_DURATION,
          });
        },
      });
    } catch (error) {
      console.log(error);
      open(<ErrorToast message="Error deleting user" />, {
        duration: DEFAULT_TOAST_DURATION,
      });
    }
  };

  return (
    <div className="w-full flex items-center flex-col gap-2">
      <CloseButton onClick={() => close()} className="absolute top-4 right-4" />
      <div className="w-full flex items-center justify-center flex-col gap-2">
        <h1 className="text-center font-inter font-bold text-lg text-lume-primary-light">
          Are you sure you want to
          <br />
          delete your user profile?
        </h1>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <button
          type="button"
          disabled={isPending}
          onClick={handleDelete}
          className="btn btn-error bg-red-400 hover:bg-red-500 text-white rounded-[10px]"
        >
          {isPending ? "Deleting..." : "Yes, delete account!"}
        </button>
        <button
          type="button"
          disabled={isPending}
          className="btn btn-outline text-lume-primary-light bg-lume-primary-dark border-lume-primary-dark rounded-[10px]"
          onClick={() => close()}
        >
          No, keep it!
        </button>
      </div>
    </div>
  );
};

export default DeleteUserProfile;
