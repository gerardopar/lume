import React, { useState } from "react";

import BellIcon from "@components/svgs/BellIcon";
import SearchIcon from "@components/svgs/SearchIcon";

export const TopBar: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <header className="w-full sticky top-0 z-50 bg-lume-primary-dark pb-4 mb-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center flex-1 max-w-[60%] relative">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className={`
              w-full bg-lume-secondary-dark rounded-full p-2 py-[10px] placeholder:text-lume-primary-light 
              focus:outline-none placeholder:font-poppins placeholder:font-[200] placeholder:text-[16px]
               pl-4
              `}
          />

          <SearchIcon className="h-5 w-5 text-lume-primary-light absolute right-4 top-1/2 -translate-y-1/2" />
        </div>

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
