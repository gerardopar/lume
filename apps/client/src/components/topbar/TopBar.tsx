import React, { useState, useMemo, useEffect } from "react";
import debounce from "lodash/debounce";
import { trpc } from "@utils/trpc";

import BellIcon from "@components/svgs/BellIcon";
import SearchIcon from "@components/svgs/SearchIcon";

export const TopBar: React.FC = () => {
  const [search, setSearch] = useState<string>(""); // what user is typing
  const [debouncedSearch, setDebouncedSearch] = useState<string>(""); // debounced value
  const [open, setOpen] = useState(false);

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 400),
    []
  );

  useEffect(() => {
    debouncedUpdate(search);
  }, [search, debouncedUpdate]);

  const { data, isLoading } = trpc.movies.searchKeywords.useQuery(
    { query: debouncedSearch },
    { enabled: debouncedSearch.length > 0 }
  );

  return (
    <header className="w-full sticky top-0 z-50 bg-lume-primary-dark pb-4 mb-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center flex-1 max-w-[60%] relative">
          {/* Input */}
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            type="text"
            placeholder="Search"
            className={`
              w-full bg-lume-secondary-dark rounded-full p-2 py-[10px] placeholder:text-lume-primary-light 
              focus:outline-none placeholder:font-poppins placeholder:font-[200] placeholder:text-[16px] pl-4
              font-poppins font-[200] text-base
              ${
                open && (data?.results?.length ?? 0) > 0
                  ? "rounded-b-none rounded-t-[16px]"
                  : ""
              }
            `}
          />

          {isLoading ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <span className="loading loading-ring loading-xl" />
            </div>
          ) : (
            <SearchIcon className="h-5 w-5 text-lume-primary-light absolute right-4 top-1/2 -translate-y-1/2" />
          )}

          {/* Dropdown */}
          {open && (data?.results?.length ?? 0) > 0 && (
            <ul className="absolute top-full w-full bg-lume-secondary-dark  rounded-b-xl shadow-lg z-50 overflow-hidden max-h-[200px] overflow-y-scroll touch-pan-up">
              {data?.results?.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="w-full text-base font-poppins font-[200] text-left px-4 py-2 hover:bg-lume-primary-dark/50 text-lume-primary-light last:pb-4 capitalize"
                    onClick={() => {
                      setSearch(item.name);
                      setOpen(false);
                    }}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
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
