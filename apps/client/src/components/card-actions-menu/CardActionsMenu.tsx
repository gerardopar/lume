import React from "react";

import { AnimatePresence, motion } from "motion/react";

import PlayIcon from "@components/svgs/PlayIcon";
import HeartIcon from "@components/svgs/HeartIcon";
import ShareIcon from "@components/svgs/ShareIcon";
import CloseButton from "@components/shared/CloseButton";

import {
  CardActionMenuEnum,
  cardActionsMenu,
} from "./card-actions-menu.helpers";

export const CardActionsMenu: React.FC<{
  isInline?: boolean;
  handleCloseInline?: () => void;
}> = ({ isInline, handleCloseInline }) => {
  if (isInline) {
    return (
      <AnimatePresence>
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/60 rounded-xl"
        >
          <CloseButton
            onClick={() => handleCloseInline?.()}
            className="absolute top-[10px] right-[10px]"
          />

          <motion.div
            key="actions"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4 relative"
          >
            {cardActionsMenu.map((item) => {
              const iconColor =
                item.type === CardActionMenuEnum.Favorites
                  ? "text-red-500"
                  : "text-white";

              return (
                <button
                  key={item.id}
                  className="flex items-center gap-2 px-4 py-2 bg-lume-secondary-dark/60 rounded-lg hover:bg-lume-secondary-dark transition-all duration-300 cursor-pointer"
                >
                  <item.Icon className={`${iconColor} w-4 h-4`} />
                  <span
                    className={`text-white font-poppins font-[200] text-sm text-center`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold  font-inter mb-2">Options</h2>
      <ul className="flex flex-col gap-2">
        <li className="font-poppins font-[200] text-lg flex items-center gap-2">
          <HeartIcon className="w-4 h-4" /> Add to favorites
        </li>
        <li className="font-poppins font-[200] text-lg flex items-center gap-2">
          <PlayIcon className="w-4 h-4" /> Add to Watchlist
        </li>
        <li className="font-poppins font-[200] text-lg flex items-center gap-2">
          <ShareIcon className="w-4 h-4" /> Share
        </li>
      </ul>
    </div>
  );
};

export default CardActionsMenu;
