import React from "react";

import BellIcon from "@components/svgs/BellIcon";
import SuggestionsInput from "@components/SuggestionsInput/SuggestionsInput";

export const TopBar: React.FC = () => {
  return (
    <header className="w-full sticky top-0 z-50 bg-lume-primary-dark pb-4 mb-2">
      <div className="flex items-center justify-between gap-4">
        <SuggestionsInput />

        <div className="flex items-center gap-2">
          <div className="flex items-center p-[10px] rounded-full bg-lume-secondary-dark">
            <BellIcon className="w-5 h-5 text-lume-primary-light" />
          </div>
          <div className="rounded-full overflow-hidden bg-lume-secondary-dark h-[40px] w-[40px] flex justify-center items-center">
            <img
              className="w-full h-full object-cover"
              src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
