import React from "react";

import XIcon from "../svgs/XIcon";
import CheckmarkIcon from "@components/svgs/CheckmarkIcon";

import { useToast } from "../../stores/toasts";

export const SuccessToast: React.FC<{ message: string }> = ({ message }) => {
  const { close } = useToast();

  return (
    <div className="border border-green-500 text-white bg-green-300 w-full p-4 rounded-[10px] shadow-lg flex items-center gap-2">
      <div className="p-2 bg-green-500 rounded-full">
        <CheckmarkIcon className="inline text-white" />
      </div>
      <div className="flex flex-col items-start ml-1 text-lume-primary-dark mr-8">
        <p className="font-inter font-bold text-base">Success!</p>
        <p className="font-poppins text-sm">{message}.</p>
      </div>
      <button
        type="button"
        className="text-lume-primary-dark"
        onClick={() => close()}
      >
        <XIcon className="inline" />
      </button>
    </div>
  );
};

export default SuccessToast;
